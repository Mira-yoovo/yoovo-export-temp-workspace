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
  YoovoExportLibraryService,
  ExportLoginForTestingComponent,
} from 'yoovo-export-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    YoovoExportLibraryComponent,
    ExportLoginForTestingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'yoovo-export-app';
  private isBrowser: boolean;
  showLogin = true; // Show login form for testing

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
    // Clean up connection and popup when the app is destroyed
    this.exportService.closeExportPopup();
    this.exportService.stopConnection();
  }

  /**
   * Open the export popup - the library handles everything
   *
   * You can choose where to display the popup:
   * 1. Default: document.body
   * 2. Specific container by ID
   * 3. Specific container by element reference
   */
  onExport() {
    console.log('📤 Export button clicked');

    // Option 1: Open in document.body (default)
    // this.exportService.openExportPopup();

    // Option 2: Open in a specific container by ID
    this.exportService.openExportPopup({ containerId: 'popup-container' });

    // Option 3: Open in the navbar
    // this.exportService.openExportPopup({ containerId: 'navbar' });

    // Option 4: Open using element reference (if you have @ViewChild)
    // const container = document.getElementById('popup-container');
    // this.exportService.openExportPopup({ containerElement: container });
  }
}
