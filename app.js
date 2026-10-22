'use strict';
let language=document.documentElement.lang==='en'?'en':'es';
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
const modal=document.querySelector('#lightbox');let opener,activePhotos=[],photoIndex=0;
const galleryItems=[...document.querySelectorAll('[data-category]')];
function updateGalleryCount(){const count=galleryItems.filter(f=>!f.hidden).length;const counter=document.querySelector('.gallery-count');if(counter)counter.textContent=language==='en'?`${count} photos`:`${count} fotografías`;document.querySelector('.light-prev').setAttribute('aria-label',language==='en'?'Previous photo':'Foto anterior');document.querySelector('.light-next').setAttribute('aria-label',language==='en'?'Next photo':'Foto siguiente');}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));galleryItems.forEach(f=>{f.hidden=button.dataset.filter!=='all'&&f.dataset.category!==button.dataset.filter});updateGalleryCount()}));
function showPhoto(){const photo=activePhotos[photoIndex].querySelector('img');modal.querySelector('img').src=photo.src;modal.querySelector('img').alt=photo.alt;modal.querySelector('p').textContent=`${photoIndex+1} / ${activePhotos.length} · ${photo.alt}`;}
function stepPhoto(direction){photoIndex=(photoIndex+direction+activePhotos.length)%activePhotos.length;showPhoto()}
document.querySelectorAll('[data-photo]').forEach(button=>{const photo=button.querySelector('img');button.setAttribute('aria-label',photo.alt);button.addEventListener('click',()=>{opener=button;activePhotos=galleryItems.filter(f=>!f.hidden).map(f=>f.querySelector('[data-photo]'));photoIndex=activePhotos.findIndex(b=>b.dataset.photo===button.dataset.photo);if(photoIndex<0){activePhotos=[button];photoIndex=0}showPhoto();modal.showModal()})});
modal.querySelector('.close').addEventListener('click',()=>modal.close());modal.querySelector('.light-prev').addEventListener('click',()=>stepPhoto(-1));modal.querySelector('.light-next').addEventListener('click',()=>stepPhoto(1));modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();stepPhoto(-1)}if(e.key==='ArrowRight'){e.preventDefault();stepPhoto(1)}});modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()}});modal.addEventListener('close',()=>opener?.focus());
updateGalleryCount();
const requestedLanguage=new URLSearchParams(location.search).get('lang');
if(requestedLanguage&&requestedLanguage!==language&&['es','en'].includes(requestedLanguage))location.replace(document.body.dataset[requestedLanguage==='en'?'urlEn':'urlEs']);

function syncPageLinks(){}
syncPageLinks();

// Set the confirmed booking URL here when the listing is ready.
const BOOKING_URL = '';
const bookingDialog=document.querySelector('#reserve-dialog');let bookingOpener;
document.querySelectorAll('[data-reserve]').forEach(button=>button.addEventListener('click',()=>{if(BOOKING_URL){window.location.assign(BOOKING_URL);return}bookingOpener=button;bookingDialog.showModal()}));
bookingDialog.querySelectorAll('.reserve-close,.reserve-dismiss').forEach(button=>button.addEventListener('click',()=>bookingDialog.close()));
bookingDialog.addEventListener('close',()=>bookingOpener?.focus());
bookingDialog.addEventListener('click',e=>{if(e.target===bookingDialog){const r=bookingDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)bookingDialog.close()}});
