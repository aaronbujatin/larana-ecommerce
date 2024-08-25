import { Component } from '@angular/core';
import {LightgalleryModule} from 'lightgallery/angular'
import lightGallery from 'lightgallery';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [LightgalleryModule, ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

}
