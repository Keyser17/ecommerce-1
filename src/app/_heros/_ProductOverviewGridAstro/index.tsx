'use client';

import React from 'react';
import { Product } from '../../../payload/payload-types';
import ProductRating from '../../_components/_ReviewsAstro/reviewRating';
import ProductGallery from '../../_components/_ProductGalleryAstro/productGallery';
import ProductSizes from '../../_components/_ProductSizeAstro/productSizes';
import ProductAccordion from '../../_components/_ProductAccordionAstro';
import { Reviews } from '../../_components/_Vercelreviewstshirt/reviews';
import { Media } from '../../_components/Media';

import data from '../../../assets/dataAstro-ecommerce.json';

import classes from './index.module.scss';

export default function ProductOverview({ product }: { product: Product }) {
  const {
    title, // Remplacé par `product.title`
    meta: { image: metaImage, description } = {}, // Utilisé si disponible
  } = product;

  // Données par défaut depuis le JSON
  const jsonData = data.products[0]; // Assurez-vous que c'est l'index souhaité
  const colors = jsonData.colors || [];
  const images = jsonData.images || [];
  const full_description = jsonData.full_description || description || '';
  const price = jsonData.price || 0;
  const highlights = jsonData.highlights || [];
  const details = jsonData.details || '';
  const rating = jsonData.rating || 0;
  const reviews = jsonData.reviews || 0;
  const sizes = jsonData.sizes || {};

  return (
    <div className="card card-product card-plain">
      <div className="row">
        {/* Galerie d'images */}
        {images.length > 0 && <ProductGallery images={images} />}

        <div className="col-12 col-lg-6 ps-lg-5">
          {/* Titre depuis `product.title` */}
          {title && <h2 className="mt-4">{title}</h2>}
          {/* Description */}
          {full_description && <p className="mb-5">{full_description}</p>}

          <form action="" method="post">
            {/* Prix */}
            {price > 0 && (
              <div className="d-flex">
                <h3 className="font-weight-normal">${price.toLocaleString()}</h3>
              </div>
            )}

            {/* Évaluation */}
            {rating > 0 && (
              <>
                <h3 className="sr-only">Reviews</h3>
                <div className="d-flex">
                  <ProductRating rating={rating} />
                  <span className="ms-3">{reviews} reviews</span>
                </div>
              </>
            )}

            {/* Tailles */}
            {sizes && <ProductSizes sizes={sizes} />}
            <button className="btn btn-dark btn-lg" type="submit">
              Add to cart
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-lg-6">
          <h4>Product Description</h4>
          {full_description && <p>{full_description}</p>}
          {highlights?.length > 0 && (
            <>
              <h6>Benefits</h6>
              <ul className="text-sm">
                {highlights.map((highlight, i) => (
                  <li key={i} className="mb-2">
                    {highlight}
                  </li>
                ))}
              </ul>
            </>
          )}
          {details && (
            <>
              <h6>More about product</h6>
              <p>{details}</p>
            </>
          )}
        </div>
        <ProductAccordion />
        <Reviews />
      </div>
    </div>
  );
}
