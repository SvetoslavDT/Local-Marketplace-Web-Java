import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/services/user/user';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

function passwordMatchValidator() {
  return (group: any) => {
    const password = group.get('password')?.value;
    const repeat = group.get('repeatPassword')?.value;
    if (!password && !repeat) return null;
    return password === repeat ? null : { passwordMismatch: true };
  };
}

@Component({
  selector: 'app-settings-page',
  imports: [],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
  standalone: true
})
export class SettingsPage {}
