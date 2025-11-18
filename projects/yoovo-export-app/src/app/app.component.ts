import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  YoovoExportLibraryComponent,
  ExportChooseYourPiComponent,
  YoovoExportLibraryService,
  Device,
} from 'yoovo-export-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    YoovoExportLibraryComponent,
    ExportChooseYourPiComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'yoovo-export-app';
  showExportPopup = false;
  private isBrowser: boolean;

  constructor(
    private exportService: YoovoExportLibraryService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Initialize SignalR connection only in browser environment
    if (this.isBrowser) {
      console.log('🚀 Initializing SignalR connection...');
      this.exportService.initializeConnection();
    }
  }

  ngOnDestroy() {
    // Clean up connection when the app is destroyed
    this.exportService.stopConnection();
  }

  openExportPopup() {
    this.showExportPopup = true;
  }

  closeExportPopup() {
    this.showExportPopup = false;
  }

  onDeviceSelect(device: Device | null) {
    console.log('Device selected:', device);
    if (device) {
      // Handle device selection
      console.log('Selected device ID:', device.id);
      console.log('Selected device name:', device.name);
    }
  }
}
