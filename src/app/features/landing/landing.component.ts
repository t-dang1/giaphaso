import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = '/gia-pha/js/pubhtree.js'; // Đường dẫn tới file JavaScript
    script.async = true; // Tải script không đồng bộ
    document.body.appendChild(script);
  }
}
