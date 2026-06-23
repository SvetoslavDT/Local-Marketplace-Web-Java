import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/services/user/user-service';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  username = signal('');
  userType = signal<string>('');
  email = signal('');

  editing = signal(false);

  form = this.fb.group({
    email: ['', [Validators.email, Validators.maxLength(255)]],
    phone: ['', [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],
    password: ['', [Validators.minLength(6), Validators.maxLength(50)]],
    repeatPassword: [''],
  });

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    this.username.set(username);

    this.userService.getUser(username).subscribe(user => {
      this.email.set(user.email);
      this.userType.set(user.userType);
      this.form.patchValue({
        email: user.email ?? '',
        phone: '',
        password: '',
        repeatPassword: '',
      });
    });
  }

  startEdit(): void {
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
    this.form.patchValue({
      email: this.email(),
      phone: '',
      password: '',
      repeatPassword: '',
    });
  }

  save(): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Save changes?',
        message: 'Do you want to save the updated user information?',
        confirmLabel: 'Save',
        cancelLabel: 'Cancel',
      },
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      const raw = this.form.getRawValue();
      const payload: any = {};

      if (raw.email?.trim()) payload.email = raw.email.trim();
      if (raw.phone?.trim()) payload.phone = raw.phone.trim();
      if (raw.password?.trim()) payload.password = raw.password.trim();

      this.userService.updateUser(this.username(), payload).subscribe(user => {
        this.email.set(user.email);
        this.userType.set(user.userType);
        this.editing.set(false);
      });
    });
  }

  deleteProfile(): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete profile?',
        message: 'This action is permanent.',
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel',
      },
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.userService.deleteUser(this.username()).subscribe();
    });
  }

  becomeVendor(): void {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Become vendor?',
        message: 'You will need a new JWT token after this change.',
        confirmLabel: 'Save',
        cancelLabel: 'Cancel',
      },
    });

    ref.afterClosed().subscribe(confirmed => {
      if (!confirmed) return;

      this.userService.becomeVendor().subscribe(() => {
        this.userType.set('VENDOR');
      });
    });
  }

  isVendor(): boolean {
    return this.userType() === 'VENDOR';
  }
}
