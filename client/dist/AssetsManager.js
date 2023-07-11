
var AssetsManager = function() {
    this.cacheName = 'appCache'; 
    this.cacheEntries = ['src-sw.js','main.bundle.js','install.bundle.js','install.bundle.js.LICENSE.txt','main.bundle.js.LICENSE.txt','index.html','service-worker.js','workbox-afb8f5db.js','manifest.json','assets/icons/icon_512x512.png','assets/icons/icon_384x384.png','assets/icons/icon_256x256.png','assets/icons/icon_192x192.png','assets/icons/icon_128x128.png','assets/icons/icon_96x96.png','/','/other'];
    this.hashes = ['901a1d7da8624aa07fc6','src-sw','index','service-worker','workbox-afb8f5db','manifest','assets/icons/icon_512x512','assets/icons/icon_384x384','assets/icons/icon_256x256','assets/icons/icon_192x192','assets/icons/icon_128x128','assets/icons/icon_96x96'];
};

AssetsManager.prototype.addAllToCache = function() {
    if(!this.cacheName)
        throw new Error('Please provide cacheName in plugin options');
    const ctx = this;

    return caches.open(ctx.cacheName).then(function(cache) {
      Promise.all(
        ctx.cacheEntries.map(function(asset){cache.add(asset)})
      );
    });            
};

AssetsManager.prototype.removeNotInAssets = function() {
    var ctx = this;   
    
     return caches.open(ctx.cacheName).then(function(cache) {
          cache.keys().then(function(keys) {
              return Promise.all(
                keys.filter(function(request){
                  var erase = true;
                  var noErase = false;          
                  return ctx.cacheEntries.indexOf(request.url) >= 0 ? noErase:erase;
                }).map(function(entryToErase){          
                  cache.delete(entryToErase);                                
                })      
              );
          });
      }); 
};

