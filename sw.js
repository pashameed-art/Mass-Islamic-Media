const CACHE_NAME='mass-islamic-media-v18-7';
const APP_SHELL=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./maskable-icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 event.respondWith(fetch(event.request).then(response=>{
   const copy=response.clone();
   caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)).catch(()=>{});
   return response;
 }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
});
