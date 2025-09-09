// XSMLX Widget - Snippet dinámico para cargar desde GitHub
// Este archivo se carga dinámicamente desde: https://raw.githubusercontent.com/AccoAI/XSMLX/main/snippet.js

(function() {
    'use strict';
    
    // Configuración del widget XSMLX
    const XSMLX_CONFIG = {
        backendUrl: 'https://xsmlx.onrender.com/api/process',
        widgetId: 'xsmlx-widget-' + Math.random().toString(36).substr(2, 9),
        instagramClientId: '674349595036688'
    };

    // Variables globales
    let userPhotoFile = null;
    let clothingImages = [];
    let instagramPhotos = [];
    let selectedInstagramPhoto = null;

    function createXsmlxWidget() {
        return `
            <div id="${XSMLX_CONFIG.widgetId}" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: Arial, sans-serif;
            ">
                <button onclick="openXsmlxModal('${XSMLX_CONFIG.widgetId}')" style="
                    width: 80px;
                    height: 40px;
                    background: white;
                    border: 2px solid #000;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: bold;
                    color: #000;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    XSMLX
                </button>
            </div>
        `;
    }

    function createXsmlxModal() {
        return `
            <div id="xsmlx-modal" style="
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                font-family: Arial, sans-serif;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 12px;
                    padding: 30px;
                    max-width: 600px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="margin: 0; color: #333;">XSMLX Virtual Try-On</h2>
                        <button onclick="closeXsmlxModal()" style="
                            background: none;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            color: #666;
                        ">&times;</button>
                    </div>
                    
                    <!-- Sección de foto del usuario -->
                    <div id="user-photo-section" style="margin-bottom: 20px;">
                        <h3>1. Tu foto</h3>
                        <div style="margin-bottom: 15px;">
                            <label style="margin-right: 20px;">
                                <input type="radio" name="photo-source" value="upload" checked onchange="togglePhotoSource()">
                                Subir archivo
                            </label>
                            <label>
                                <input type="radio" name="photo-source" value="instagram" onchange="togglePhotoSource()">
                                Instagram
                            </label>
                        </div>
                        
                        <div id="upload-section">
                            <input type="file" id="user-photo" accept="image/*" onchange="handleUserPhoto(event)" style="
                                width: 100%;
                                padding: 10px;
                                border: 2px dashed #ddd;
                                border-radius: 8px;
                                margin-bottom: 10px;
                            ">
                            <div id="user-preview"></div>
                        </div>
                        
                        <div id="instagram-section" style="display: none;">
                            <button onclick="loadInstagramPhotos()" style="
                                width: 100%;
                                padding: 12px;
                                background: #E4405F;
                                color: white;
                                border: none;
                                border-radius: 8px;
                                cursor: pointer;
                                font-size: 16px;
                                margin-bottom: 15px;
                            ">📸 Cargar fotos de Instagram</button>
                            <div id="instagram-photos"></div>
                        </div>
                    </div>
                    
                    <!-- Sección de imágenes de productos -->
                    <div id="clothing-section" style="margin-bottom: 20px;">
                        <h3>2. Imágenes de productos detectadas</h3>
                        <div id="clothing-preview" style="
                            border: 2px dashed #ddd;
                            border-radius: 8px;
                            padding: 20px;
                            text-align: center;
                            color: #666;
                        ">
                            <p>Se detectarán automáticamente las imágenes de productos de esta página</p>
                        </div>
                    </div>
                    
                    <!-- Botón de procesamiento -->
                    <div style="text-align: center; margin-bottom: 20px;">
                        <button id="process-button" onclick="processImages()" disabled style="
                            padding: 15px 30px;
                            background: #667eea;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            cursor: pointer;
                            font-size: 16px;
                            font-weight: bold;
                        ">🚀 Procesar Virtual Try-On</button>
                    </div>
                    
                    <!-- Sección de carga -->
                    <div id="loading" style="display: none; text-align: center; padding: 20px;">
                        <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
                        <p>Procesando tu virtual try-on...</p>
                    </div>
                    
                    <!-- Sección de resultado -->
                    <div id="result" style="display: none; text-align: center;">
                        <h3>¡Resultado listo!</h3>
                        <img id="result-image" style="max-width: 100%; border-radius: 8px; margin-bottom: 15px;">
                        <br>
                        <a id="download-link" style="
                            display: inline-block;
                            padding: 10px 20px;
                            background: #28a745;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        ">📥 Descargar imagen</a>
                    </div>
                    
                    <!-- Sección de error -->
                    <div id="error" style="display: none; text-align: center; color: #dc3545; padding: 15px; background: #f8d7da; border-radius: 8px; margin-top: 15px;"></div>
                </div>
            </div>
        `;
    }

    // Funciones globales del widget
    window.openXsmlxModal = function(widgetId) {
        document.getElementById('xsmlx-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Limpiar estado anterior
        userPhotoFile = null;
        selectedInstagramPhoto = null;
        clothingImages = [];
        
        // Resetear formulario
        const userPhotoInput = document.getElementById('user-photo');
        if (userPhotoInput) userPhotoInput.value = '';
        
        const userPreview = document.getElementById('user-preview');
        if (userPreview) userPreview.innerHTML = '';
        
        // Resetear radio buttons
        const uploadRadio = document.querySelector('input[name="photo-source"][value="upload"]');
        if (uploadRadio) uploadRadio.checked = true;
        
        const uploadSection = document.getElementById('upload-section');
        const instagramSection = document.getElementById('instagram-section');
        if (uploadSection) uploadSection.style.display = 'block';
        if (instagramSection) instagramSection.style.display = 'none';
        
        // Extraer imágenes de productos de la página actual
        extractClothingImages();
        
        console.log('🔄 Modal abierto - detectando imágenes de productos en:', window.location.href);
    };

    window.closeXsmlxModal = function() {
        document.getElementById('xsmlx-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    function togglePhotoSource() {
        const uploadSection = document.getElementById('upload-section');
        const instagramSection = document.getElementById('instagram-section');
        const selectedSource = document.querySelector('input[name="photo-source"]:checked').value;
        
        if (selectedSource === 'upload') {
            uploadSection.style.display = 'block';
            instagramSection.style.display = 'none';
        } else {
            uploadSection.style.display = 'none';
            instagramSection.style.display = 'block';
        }
        
        updateProcessButton();
    }

    function handleUserPhoto(event) {
        const file = event.target.files[0];
        if (file) {
            userPhotoFile = file;
            selectedInstagramPhoto = null;
            
            const preview = document.getElementById('user-preview');
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <img src="${e.target.result}" style="max-width: 200px; max-height: 200px; border-radius: 8px; margin-top: 10px;">
                `;
            };
            reader.readAsDataURL(file);
            
            updateProcessButton();
        }
    }

    async function loadInstagramPhotos() {
        const instagramPhotosDiv = document.getElementById('instagram-photos');
        instagramPhotosDiv.innerHTML = '<p>Cargando fotos de Instagram...</p>';
        instagramPhotosDiv.style.display = 'block';
        
        try {
            // Simular carga de fotos de Instagram (reemplazar con tu lógica real)
            const mockPhotos = [
                { id: '1', url: 'https://via.placeholder.com/150x150?text=Instagram+1', thumbnail: 'https://via.placeholder.com/150x150?text=Instagram+1' },
                { id: '2', url: 'https://via.placeholder.com/150x150?text=Instagram+2', thumbnail: 'https://via.placeholder.com/150x150?text=Instagram+2' },
                { id: '3', url: 'https://via.placeholder.com/150x150?text=Instagram+3', thumbnail: 'https://via.placeholder.com/150x150?text=Instagram+3' }
            ];
            
            instagramPhotos = mockPhotos;
            displayInstagramPhotos();
            
        } catch (error) {
            console.error('Error cargando fotos de Instagram:', error);
            instagramPhotosDiv.innerHTML = '<p style="color: red;">Error cargando fotos de Instagram</p>';
        }
    }

    function displayInstagramPhotos() {
        const instagramPhotosDiv = document.getElementById('instagram-photos');
        let html = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 10px;">';
        
        instagramPhotos.forEach(photo => {
            html += `
                <div onclick="selectInstagramPhoto('${photo.id}')" style="
                    cursor: pointer;
                    border: 2px solid transparent;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: border-color 0.3s;
                " onmouseover="this.style.borderColor='#E4405F'" onmouseout="this.style.borderColor='transparent'">
                    <img src="${photo.thumbnail}" style="width: 100%; height: 100px; object-fit: cover;">
                </div>
            `;
        });
        
        html += '</div>';
        instagramPhotosDiv.innerHTML = html;
    }

    window.selectInstagramPhoto = function(photoId) {
        selectedInstagramPhoto = instagramPhotos.find(p => p.id === photoId);
        userPhotoFile = null;
        
        // Actualizar preview
        const userPreview = document.getElementById('user-preview');
        userPreview.innerHTML = `
            <img src="${selectedInstagramPhoto.thumbnail}" style="max-width: 200px; max-height: 200px; border-radius: 8px; margin-top: 10px;">
        `;
        
        updateProcessButton();
    };

    function extractClothingImages() {
        const clothingPreview = document.getElementById('clothing-preview');
        
        // Limpiar imágenes anteriores
        clothingImages = [];
        
        clothingPreview.innerHTML = '<div style="text-align: center; padding: 20px;"><div style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Buscando imágenes del producto actual...</p></div>';
        
        // Esperar un poco más para que las imágenes se carguen completamente
        setTimeout(() => {
            // Determinar qué producto está activo basado en la URL
            const currentPath = window.location.pathname;
            let activeProductId = 'main-product'; // Por defecto
            
            if (currentPath.includes('/camisetas')) {
                activeProductId = 'camisetas-product';
            } else if (currentPath.includes('/casual')) {
                activeProductId = 'casual-product';
            } else if (currentPath.includes('/formal')) {
                activeProductId = 'formal-product';
            } else if (currentPath.includes('/deportiva')) {
                activeProductId = 'deportiva-product';
            } else if (currentPath.includes('/temporada')) {
                activeProductId = 'temporada-product';
            } else if (currentPath.includes('/hoodie')) {
                activeProductId = 'hoodie-product';
            }
            
            // Buscar solo en el contenedor del producto activo
            const activeProductContainer = document.getElementById(activeProductId);
            let images = [];
            
            if (activeProductContainer) {
                images = activeProductContainer.querySelectorAll('img');
                console.log(`🔍 Analizando ${images.length} imágenes del producto activo: ${activeProductId}`);
            } else {
                // Fallback: buscar en toda la página si no encuentra el contenedor
                images = document.querySelectorAll('img');
                console.log(`⚠️ No se encontró contenedor ${activeProductId}, analizando todas las imágenes (${images.length})`);
            }
            
            const productImages = [];
            
            console.log(`🔍 URL actual: ${currentPath} - Producto activo: ${activeProductId}`);
            
            images.forEach((img, index) => {
                const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy');
                if (src && isProductImage(src, img)) {
                    // Forzar recarga de imagen para evitar cache
                    const freshSrc = src + (src.includes('?') ? '&' : '?') + 't=' + Date.now();
                    
                    productImages.push({
                        src: freshSrc,
                        originalSrc: src,
                        alt: img.alt || 'Producto',
                        element: img,
                        width: img.naturalWidth || img.width,
                        height: img.naturalHeight || img.height
                    });
                    
                    console.log(`✅ Imagen ${index + 1} detectada: ${src} (${img.naturalWidth}x${img.naturalHeight})`);
                }
            });
        
            if (productImages.length > 0) {
                // Eliminar duplicados basándose en la URL original
                const uniqueImages = [];
                const seenUrls = new Set();
                
                productImages.forEach(img => {
                    if (!seenUrls.has(img.originalSrc)) {
                        seenUrls.add(img.originalSrc);
                        uniqueImages.push(img);
                    }
                });
                
                // Limitar a máximo 5 imágenes para evitar errores del backend
                clothingImages = uniqueImages.slice(0, 5);
                
                let previewHTML = `<h4>Imágenes del producto actual (${clothingImages.length}):</h4>`;
                clothingImages.forEach((img, index) => {
                    previewHTML += `
                        <div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background: white;">
                            <img src="${img.src}" alt="${img.alt}" style="max-width: 100px; max-height: 100px; margin-right: 10px; vertical-align: top; border-radius: 4px;">
                            <div style="display: inline-block; vertical-align: top;">
                                <div style="font-weight: bold; margin-bottom: 5px;">Imagen ${index + 1}</div>
                                <div style="font-size: 12px; color: #666;">${img.width}x${img.height}px</div>
                                <div style="font-size: 11px; color: #999; margin-top: 2px;">${img.alt}</div>
                            </div>
                        </div>
                    `;
                });
                clothingPreview.innerHTML = previewHTML;
                
                console.log(`✅ ${clothingImages.length} imágenes únicas del producto actual encontradas y listas para procesar`);
                console.log(`📊 Eliminados ${productImages.length - clothingImages.length} duplicados`);
                updateProcessButton();
            } else {
                clothingPreview.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #666;">
                        <p>❌ No se encontraron imágenes del producto actual</p>
                        <p style="font-size: 12px; margin-top: 10px;">Producto: ${activeProductId}</p>
                        <button onclick="extractClothingImages()" style="margin-top: 10px; padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            🔄 Reintentar
                        </button>
                    </div>
                `;
                console.log(`❌ No se encontraron imágenes del producto: ${activeProductId}`);
            }
        }, 1000);
    }

    function isProductImage(src, imgElement) {
        const srcLower = src.toLowerCase();
        const altLower = (imgElement.alt || '').toLowerCase();
        const classLower = (imgElement.className || '').toLowerCase();
        const idLower = (imgElement.id || '').toLowerCase();
        
        // Patrones a excluir (más estrictos)
        const skipPatterns = [
            'logo', 'icon', 'banner', 'header', 'footer', 'social',
            'facebook', 'twitter', 'instagram', 'pinterest', 'youtube',
            'advertisement', 'ad-', 'sponsor', 'promo', 'favicon',
            'loading', 'placeholder', 'spinner', 'arrow', 'button',
            'menu', 'nav', 'sidebar', 'widget', 'tooltip', 'modal',
            'close', 'back', 'next', 'prev', 'search', 'cart',
            'user', 'profile', 'avatar', 'notification', 'badge',
            'xsmlx', 'widget' // Excluir el propio widget
        ];
        
        // Verificar patrones de exclusión
        for (const pattern of skipPatterns) {
            if (srcLower.includes(pattern) || altLower.includes(pattern) || 
                classLower.includes(pattern) || idLower.includes(pattern)) {
                return false;
            }
        }
        
        // Patrones de productos (más específicos y amplios)
        const productPatterns = [
            'product', 'item', 'clothing', 'dress', 'shirt', 'pants',
            'jacket', 'sweater', 'shoes', 'bag', 'accessory', 'model',
            'main', 'gallery', 'hero', 'featured', 'thumbnail', 'image',
            'photo', 'picture', 'preview', 'zoom', 'large', 'medium',
            'ropa', 'camiseta', 'hoodie', 'casual', 'formal', 'deportiva',
            'temporada', 'stylehub', '133826', 'i2651710899009', 'shi26517108990',
            'gwf00922', '252br0413', '252bbaj7z', 'hot_hoodie', 'nudeproject'
        ];
        
        // Verificar patrones de productos
        for (const pattern of productPatterns) {
            if (srcLower.includes(pattern) || altLower.includes(pattern) || 
                classLower.includes(pattern) || idLower.includes(pattern)) {
                return true;
            }
        }
        
        // Verificar extensiones de imagen válidas
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
        const hasValidExtension = imageExtensions.some(ext => srcLower.includes(ext));
        
        // Verificar que la imagen tenga un tamaño mínimo (más permisivo)
        const isLargeEnough = (imgElement.naturalWidth > 50 && imgElement.naturalHeight > 50) || 
                            (imgElement.width > 50 && imgElement.height > 50);
        
        // Verificar que no sea una imagen muy pequeña (probablemente icono)
        const isNotTooSmall = (imgElement.naturalWidth > 30 && imgElement.naturalHeight > 30) || 
                             (imgElement.width > 30 && imgElement.height > 30);
        
        // Si tiene extensión válida, es lo suficientemente grande y no es muy pequeña
        if (hasValidExtension && isLargeEnough && isNotTooSmall) {
            // Verificar que no esté en el header o footer
            const parentElement = imgElement.closest('header, footer, nav, .header, .footer, .nav');
            if (!parentElement) {
                return true;
            }
        }
        
        return false;
    }

    function updateProcessButton() {
        const processButton = document.getElementById('process-button');
        const hasUserPhoto = userPhotoFile !== null || selectedInstagramPhoto !== null;
        const hasClothingImages = clothingImages.length > 0;
        
        if (hasUserPhoto && hasClothingImages) {
            processButton.disabled = false;
            processButton.style.background = '#667eea';
        } else {
            processButton.disabled = true;
            processButton.style.background = '#ccc';
        }
    }

    window.processImages = async function() {
        const hasUserPhoto = userPhotoFile !== null || selectedInstagramPhoto !== null;
        
        if (!hasUserPhoto || clothingImages.length === 0) {
            showError('Por favor, sube tu foto o selecciona una de Instagram, y asegúrate de que se detectaron imágenes de productos');
            return;
        }

        document.getElementById('loading').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('error').style.display = 'none';
        document.getElementById('process-button').disabled = true;

        try {
            const formData = new FormData();
            
            // Agregar foto del usuario (archivo o Instagram)
            if (userPhotoFile) {
                formData.append('user_photo', userPhotoFile);
                formData.append('photo_source', 'upload');
            } else if (selectedInstagramPhoto) {
                formData.append('instagram_photo_url', selectedInstagramPhoto.url);
                formData.append('instagram_photo_id', selectedInstagramPhoto.id);
                formData.append('photo_source', 'instagram');
            }
            
            formData.append('page_url', window.location.href);
            
            // Añadir URLs de imágenes de ropa en múltiples formatos para compatibilidad
            clothingImages.forEach((img, index) => {
                formData.append(`clothing_images[${index}]`, img.originalSrc);
                formData.append(`clothing_url_${index}`, img.originalSrc);
            });
            
            // También añadir como array separado por comas
            const clothingUrls = clothingImages.map(img => img.originalSrc).join(',');
            formData.append('clothing_urls', clothingUrls);
            
            // Y como JSON string
            formData.append('clothing_images_json', JSON.stringify(clothingImages.map(img => img.originalSrc)));
            
            // Añadir metadata adicional
            formData.append('clothing_count', clothingImages.length.toString());
            formData.append('product_type', getCurrentProductType());
            
            // Log para debug
            console.log('📤 Enviando al backend:', {
                user_photo: userPhotoFile ? 'file' : selectedInstagramPhoto ? 'instagram' : 'none',
                clothing_images: clothingImages.length,
                product_type: getCurrentProductType(),
                page_url: window.location.href,
                clothing_urls: clothingUrls
            });
            
            // Log detallado del FormData
            console.log('📋 FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(`  ${key}:`, value);
            }

            const response = await fetch(XSMLX_CONFIG.backendUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                let errorMessage = `Error del servidor: ${response.status}`;
                try {
                    const errorData = await response.text();
                    if (errorData) {
                        errorMessage += ` - ${errorData}`;
                    }
                } catch (e) {
                    // Ignorar error al leer respuesta
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            
            if (result.success) {
                showResult(result.image_url);
            } else {
                throw new Error(result.error || 'Error desconocido');
            }

        } catch (error) {
            console.error('Error:', error);
            showError(error.message);
        } finally {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('process-button').disabled = false;
        }
    };

    function getCurrentProductType() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/camisetas')) return 'camisetas';
        if (currentPath.includes('/casual')) return 'casual';
        if (currentPath.includes('/formal')) return 'formal';
        if (currentPath.includes('/deportiva')) return 'deportiva';
        if (currentPath.includes('/temporada')) return 'temporada';
        if (currentPath.includes('/hoodie')) return 'hoodie';
        return 'main';
    }

    function showResult(imageUrl) {
        const resultDiv = document.getElementById('result');
        const resultImage = document.getElementById('result-image');
        const downloadLink = document.getElementById('download-link');
        
        const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : 
            XSMLX_CONFIG.backendUrl.replace('/api/process', '') + imageUrl;
        
        resultImage.src = fullImageUrl;
        downloadLink.href = fullImageUrl;
        downloadLink.download = `virtual_try_on_${Date.now()}.png`;
        
        resultDiv.style.display = 'block';
    }

    function showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    // Inicialización del widget
    function initDynamicWidget() {
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = createXsmlxWidget();
        document.body.appendChild(widgetContainer);
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = createXsmlxModal();
        document.body.appendChild(modalContainer);
        
        document.getElementById('xsmlx-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeXsmlxModal();
            }
        });
        
        // Detectar cambios en la URL (cuando cambias de tab)
        let currentUrl = window.location.href;
        setInterval(() => {
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                console.log('🔄 URL cambió a:', currentUrl);
                
                // Si el modal está abierto, re-detectar imágenes
                const modal = document.getElementById('xsmlx-modal');
                if (modal && modal.style.display === 'block') {
                    console.log('🔄 Re-detectando imágenes por cambio de URL');
                    extractClothingImages();
                }
            }
        }, 500); // Verificar cada 500ms
        
        console.log('✅ XSMLX Widget cargado dinámicamente desde GitHub');
    }

    // CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDynamicWidget);
    } else {
        initDynamicWidget();
    }

})();
