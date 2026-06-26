import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDto } from '../../core/models/product/product-details.dto';
import { ProductType } from '../../core/models/product/type';
import { CreateProductRequest } from '../../core/models/product/create-product-request.dto';
import { ProductService } from '../../core/services/product/product-service';
import { AuthService } from '../../core/services/auth/auth-service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

interface ProductForm {
  productType: ProductType | '';
  name: string;
  description: string;
  priceInput: string;
  quantity: string;
}

function emptyForm(): ProductForm {
  return { productType: '', name: '', description: '', priceInput: '', quantity: '' };
}

@Component({
  selector: 'app-my-products-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './my-products-page.html',
  styleUrl: './my-products-page.css',
})
export class MyProductsPage implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly ProductType = ProductType;
  readonly productTypes = Object.values(ProductType);

  products = signal<ProductDetailsDto[]>([]);
  page = signal(0);
  totalPages = signal(0);
  loading = signal(false);
  error = signal<string | null>(null);

  showForm = signal(false);
  editingId = signal<number | null>(null);
  form = signal<ProductForm>(emptyForm());
  formError = signal<string | null>(null);
  formSaving = signal(false);

  uploadingId = signal<number | null>(null);
  uploadError = signal<string | null>(null);

  get currentUsername(): string {
    return this.authService.currentUsername() ?? '';
  }

  ngOnInit(): void {
    if (!this.authService.isVendor()) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
      return;
    }
    const routeUsername = this.route.snapshot.paramMap.get('username');
    const current = this.authService.currentUsername();
    if (routeUsername && current && routeUsername !== current) {
      this.router.navigate(['/my-products', current], { replaceUrl: true });
      return;
    }
    this.loadPage(0);
  }

  loadPage(p: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.productService
      .searchProducts({ productTypes: [], makerUsername: this.currentUsername, inStock: null }, p, 12)
      .subscribe({
        next: res => {
          this.products.set(res.content);
          this.page.set(res.number);
          this.totalPages.set(res.totalPages);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load your products.');
          this.loading.set(false);
        },
      });
  }

  prev(): void { if (this.page() > 0) this.loadPage(this.page() - 1); }
  next(): void { if (this.page() < this.totalPages() - 1) this.loadPage(this.page() + 1); }

  openCreate(): void {
    this.editingId.set(null);
    this.form.set(emptyForm());
    this.formError.set(null);
    this.showForm.set(true);
  }

  openEdit(product: ProductDetailsDto): void {
    this.editingId.set(product.id);
    this.form.set({
      productType: product.productType as ProductType,
      name: product.name,
      description: product.description,
      priceInput: (product.price / 100).toFixed(2),
      quantity: String(product.quantity),
    });
    this.formError.set(null);
    this.showForm.set(true);
  }

  closeForm(): void { this.showForm.set(false); }

  updateField<K extends keyof ProductForm>(key: K, value: ProductForm[K]): void {
    this.form.update(f => ({ ...f, [key]: value }));
  }

  save(): void {
    const f = this.form();
    if (!f.productType) { this.formError.set('Please select a type.'); return; }
    if (!f.name.trim()) { this.formError.set('Name is required.'); return; }

    const priceFloat = parseFloat(f.priceInput);
    if (isNaN(priceFloat) || priceFloat < 0) { this.formError.set('Enter a valid price.'); return; }

    const qty = parseInt(f.quantity, 10);
    if (isNaN(qty) || qty < 0) { this.formError.set('Enter a valid quantity.'); return; }

    this.formError.set(null);
    this.formSaving.set(true);

    const dto: CreateProductRequest = {
      productType: f.productType as ProductType,
      name: f.name.trim(),
      description: f.description.trim(),
      price: Math.round(priceFloat * 100),
      quantity: qty,
    };

    const id = this.editingId();
    const req = id != null
      ? this.productService.updateProduct(id, dto)
      : this.productService.createProduct(dto);

    req.subscribe({
      next: saved => {
        if (id != null) {
          this.products.update(list => list.map(p => p.id === id ? saved : p));
        } else {
          this.products.update(list => [...list, saved]);
        }
        this.formSaving.set(false);
        this.showForm.set(false);
      },
      error: () => {
        this.formError.set('Failed to save product. Please try again.');
        this.formSaving.set(false);
      },
    });
  }

  deleteProduct(product: ProductDetailsDto): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete product?',
        message: `"${product.name}" will be permanently removed.`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
      },
    });
    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.productService.deleteProduct(product.id).subscribe({
        next: () => this.products.update(list => list.filter(p => p.id !== product.id)),
        error: () => this.error.set('Could not delete product.'),
      });
    });
  }

  onPictureFile(product: ProductDetailsDto, event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploadingId.set(product.id);
    this.uploadError.set(null);
    this.productService.uploadPicture(product.id, file).subscribe({
      next: () => {
        this.uploadingId.set(null);
        this.loadPage(this.page());
      },
      error: () => {
        this.uploadError.set('Picture upload failed.');
        this.uploadingId.set(null);
      },
    });
    input.value = '';
  }

  formatType(type: string): string {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  displayPrice(cents: number): string {
    return (cents / 100).toFixed(2);
  }
}
