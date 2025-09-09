// XSMLX Virtual Try-On Widget - Snippet para insertar en cualquier web
(function() {
    'use strict';
    
    // CONFIGURACIÓN - Cambia esta URL por tu servidor
    const XSMLX_CONFIG = {
        backendUrl: 'https://xsmlx.onrender.com/api/process',
        widgetId: 'xsmlx-widget-' + Math.random().toString(36).substr(2, 9)
    };

    // Crear el widget
    function createXsmlxWidget() {
        return `
                <div id="${XSMLX_CONFIG.widgetId}" style="
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    display: inline-block;
                    margin: 10px;
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                ">
                <button onclick="openXsmlxModal('${XSMLX_CONFIG.widgetId}')" style="
                    width: 80px;
                    height: 40px;
                    background: white;
                    border: 3px solid #ff0000;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                    box-shadow: 0 4px 8px rgba(255, 0, 0, 0.3);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(255, 0, 0, 0.5)'" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 8px rgba(255, 0, 0, 0.3)'">
                    <span style="color: #000;">X</span>
                    <span style="color: #ff0000;">S</span>
                    <span style="color: #00ff00;">M</span>
                    <span style="color: #000;">L</span>
                    <span style="color: #ffff00;">X</span>
                </button>
            </div>
        `;
    }

    // Crear el modal
    function createXsmlxModal() {
        return `
            <div id="xsmlx-modal" style="
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                backdrop-filter: blur(5px);
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    border-radius: 16px;
                    padding: 30px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                ">
                    <button onclick="closeXsmlxModal()" style="
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #999;
                        padding: 5px;
                        border-radius: 50%;
                        width: 35px;
                        height: 35px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    " onmouseover="this.style.background='#f0f0f0'; this.style.color='#333'" onmouseout="this.style.background='none'; this.style.color='#999'">&times;</button>
                    
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h2 style="font-size: 28px; font-weight: 700; color: #333; margin: 0 0 8px 0;">👕 Prueba Virtual</h2>
                        <p style="font-size: 16px; color: #666; margin: 0;">Sube tu foto y pruébate esta prenda</p>
                    </div>

                    <div style="background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #bee5eb; font-size: 14px;">
                        <strong>✅ Automático:</strong> La foto de la prenda se extraerá de esta página web.
                    </div>

                        <div style="margin-bottom: 25px; padding: 20px; border: 2px solid #f0f0f0; border-radius: 12px; background: #fafafa;">
                            <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                                <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">1</span>
                                Sube tu foto
                            </h3>
                            
                            <!-- Opciones de foto -->
                            <div style="margin-bottom: 15px;">
                                <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px; cursor: pointer;">
                                    <input type="radio" name="photo-source" value="upload" checked onchange="togglePhotoSource('upload')" style="margin: 0;">
                                    <span>📁 Subir archivo</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                                    <input type="radio" name="photo-source" value="instagram" onchange="togglePhotoSource('instagram')" style="margin: 0;">
                                    <span>📷 Desde Instagram</span>
                                </label>
                            </div>
                            
                            <!-- Upload de archivo -->
                            <div id="upload-section">
                                <input type="file" id="user-photo" accept="image/*" onchange="handleUserPhoto(event)" style="
                                    width: 100%;
                                    padding: 12px;
                                    border: 2px dashed #ddd;
                                    border-radius: 8px;
                                    background: white;
                                    cursor: pointer;
                                    transition: all 0.3s ease;
                                    text-align: center;
                                " onmouseover="this.style.borderColor='#667eea'; this.style.background='#f8f9ff'" onmouseout="this.style.borderColor='#ddd'; this.style.background='white'">
                            </div>
                            
                            <!-- Instagram section -->
                            <div id="instagram-section" style="display: none;">
                                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
                                        <strong>📷 Instagram:</strong> Cargando automáticamente tus fotos de Instagram...
                                    </p>
                                </div>
                                <div id="instagram-photos" style="display: none;">
                                    <h4 style="margin: 0 0 15px 0; color: #333;">Selecciona una foto:</h4>
                                    <div id="instagram-gallery" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;"></div>
                                </div>
                            </div>
                            
                            <div id="user-preview" style="margin-top: 15px; text-align: center;"></div>
                        </div>

                    <div style="margin-bottom: 25px; padding: 20px; border: 2px solid #f0f0f0; border-radius: 12px; background: #fafafa;">
                        <h3 style="font-size: 18px; font-weight: 600; color: #333; margin: 0 0 12px 0; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #667eea; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;">2</span>
                            Foto de la prenda
                        </h3>
                        <div style="background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #bee5eb; font-size: 14px;">
                            <strong>✅ Automático:</strong> Se extraerá de esta página web
                        </div>
                        <div id="clothing-preview" style="margin-top: 15px; text-align: center;"></div>
                    </div>

                    <button id="process-button" onclick="processImages()" disabled style="
                        width: 100%;
                        padding: 16px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border: none;
                        border-radius: 8px;
                        color: white;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-top: 20px;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.4)'" onmouseout="this.style.transform='none'; this.style.boxShadow='none'">
                        🎨 Generar Prueba Virtual
                    </button>

                    <div id="loading" style="display: none; text-align: center; padding: 20px;">
                        <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
                        <p>Procesando con IA... Esto puede tomar unos minutos</p>
                    </div>

                    <div id="result" style="display: none; text-align: center; padding: 20px;">
                        <h3>🎉 ¡Resultado generado!</h3>
                        <img id="result-image" src="" alt="Resultado" style="max-width: 100%; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); margin-bottom: 15px;">
                        <a href="#" id="download-link" style="display: inline-block; padding: 12px 24px; background: #28a745; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.background='#218838'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#28a745'; this.style.transform='none'">📥 Descargar</a>
                    </div>

                    <div id="error" style="display: none; background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #f5c6cb;"></div>
                </div>
            </div>
        `;
    }

        // Variables globales
        let userPhotoFile = null;
        let clothingImages = [];
        let instagramPhotos = [];
        let selectedInstagramPhoto = null;

    // Función para abrir modal
    window.openXsmlxModal = function(widgetId) {
        document.getElementById('xsmlx-modal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        extractClothingImages();
    };

    // Función para cerrar modal
    window.closeXsmlxModal = function() {
        document.getElementById('xsmlx-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    };

        // Cambiar fuente de foto
        window.togglePhotoSource = function(source) {
            const uploadSection = document.getElementById('upload-section');
            const instagramSection = document.getElementById('instagram-section');
            
            if (source === 'upload') {
                uploadSection.style.display = 'block';
                instagramSection.style.display = 'none';
                // Limpiar selección de Instagram
                selectedInstagramPhoto = null;
                userPhotoFile = null;
            } else if (source === 'instagram') {
                uploadSection.style.display = 'none';
                instagramSection.style.display = 'block';
                // Limpiar archivo subido
                userPhotoFile = null;
                document.getElementById('user-photo').value = '';
                
                // Cargar automáticamente las fotos de Instagram
                loadInstagramPhotos();
            }
            
            // Limpiar preview
            document.getElementById('user-preview').innerHTML = '';
            updateProcessButton();
        };

        // Manejar foto del usuario (upload)
        window.handleUserPhoto = function(event) {
            const file = event.target.files[0];
            if (file) {
                userPhotoFile = file;
                selectedInstagramPhoto = null; // Limpiar selección de Instagram
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('user-preview');
                    preview.innerHTML = `<img src="${e.target.result}" alt="Tu foto" style="max-width: 100%; max-height: 200px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">`;
                };
                reader.readAsDataURL(file);
                
                updateProcessButton();
            }
        };

        // Cargar fotos de Instagram
        window.loadInstagramPhotos = async function() {
            const instagramPhotosDiv = document.getElementById('instagram-photos');
            const instagramGallery = document.getElementById('instagram-gallery');
            
            try {
                // Mostrar loading
                instagramGallery.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #E4405F; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div>
                        <p style="margin: 0; color: #666;">Cargando fotos de Instagram...</p>
                    </div>
                `;
                instagramPhotosDiv.style.display = 'block';
                
                // Hacer petición al backend para obtener fotos de Instagram
                const response = await fetch(XSMLX_CONFIG.backendUrl.replace('/api/process', '/api/instagram-photos'), {
                    method: 'GET'
                });
                
                if (!response.ok) {
                    throw new Error('No se pudieron cargar las fotos de Instagram');
                }
                
                const result = await response.json();
                
                if (result.success && result.photos) {
                    instagramPhotos = result.photos;
                    displayInstagramPhotos();
                } else {
                    throw new Error(result.error || 'No se encontraron fotos de Instagram');
                }
                
            } catch (error) {
                console.error('Error cargando Instagram:', error);
                instagramGallery.innerHTML = `
                    <div style="text-align: center; padding: 20px; color: #666;">
                        <p>❌ Error cargando fotos de Instagram</p>
                        <p style="font-size: 12px;">${error.message}</p>
                        <p style="font-size: 12px;">Asegúrate de que el backend esté ejecutándose y configurado con Instagram API</p>
                    </div>
                `;
            }
        };

        // Mostrar fotos de Instagram
        function displayInstagramPhotos() {
            const instagramGallery = document.getElementById('instagram-gallery');
            
            if (instagramPhotos.length === 0) {
                instagramGallery.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No se encontraron fotos de Instagram</div>';
                return;
            }
            
            let galleryHTML = '';
            instagramPhotos.forEach((photo, index) => {
                galleryHTML += `
                    <div style="border: 2px solid #ddd; border-radius: 8px; padding: 10px; cursor: pointer; transition: all 0.3s ease;" 
                         onclick="selectInstagramPhoto(${index})" 
                         onmouseover="this.style.borderColor='#667eea'" 
                         onmouseout="this.style.borderColor='#ddd'">
                        <img src="${photo.thumbnail || photo.url}" alt="Instagram Photo" style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px;">
                        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; text-align: center;">Foto ${index + 1}</p>
                    </div>
                `;
            });
            
            instagramGallery.innerHTML = galleryHTML;
        }

        // Seleccionar foto de Instagram
        window.selectInstagramPhoto = function(index) {
            selectedInstagramPhoto = instagramPhotos[index];
            userPhotoFile = null; // Limpiar archivo subido
            
            // Actualizar preview
            const preview = document.getElementById('user-preview');
            preview.innerHTML = `
                <div style="text-align: center;">
                    <img src="${selectedInstagramPhoto.url}" alt="Foto de Instagram" style="max-width: 100%; max-height: 200px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <p style="margin: 10px 0 0 0; font-size: 14px; color: #666;">✅ Foto de Instagram seleccionada</p>
                </div>
            `;
            
            // Resaltar selección
            const galleryItems = document.querySelectorAll('#instagram-gallery > div');
            galleryItems.forEach((item, i) => {
                if (i === index) {
                    item.style.borderColor = '#667eea';
                    item.style.backgroundColor = '#f0f4ff';
                } else {
                    item.style.borderColor = '#ddd';
                    item.style.backgroundColor = 'transparent';
                }
            });
            
            updateProcessButton();
        };

    // Extraer imágenes de prendas
    function extractClothingImages() {
        const clothingPreview = document.getElementById('clothing-preview');
        
        // Limpiar imágenes anteriores
        clothingImages = [];
        
        // Mostrar loading
        clothingPreview.innerHTML = '<div style="text-align: center; padding: 20px;"><div style="width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 15px;"></div><p>Buscando imágenes de productos...</p></div>';
        
        // Esperar un poco para que las imágenes se carguen
        setTimeout(() => {
            const images = document.querySelectorAll('img');
            const productImages = [];
            
            console.log(`🔍 Analizando ${images.length} imágenes en la página actual: ${window.location.href}`);
            
            images.forEach((img, index) => {
                const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy');
                if (src && isProductImage(src, img)) {
                    // Forzar recarga de imagen para evitar cache
                    const freshSrc = src + (src.includes('?') ? '&' : '?') + 't=' + Date.now();
                    
                    productImages.push({
                        src: freshSrc,
                        originalSrc: src,
                        alt: img.alt || 'Producto',
                        element: img
                    });
                    
                    console.log(`✅ Imagen ${index + 1} detectada: ${src}`);
                }
            });
        
            if (productImages.length > 0) {
                clothingImages = productImages.slice(0, 10); // Allow up to 10 images
                
                let previewHTML = `<h4>Imágenes encontradas (${clothingImages.length}):</h4>`;
                clothingImages.forEach((img, index) => {
                    previewHTML += `
                        <div style="margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 8px;">
                            <img src="${img.src}" alt="${img.alt}" style="max-width: 100px; max-height: 100px; margin-right: 10px; vertical-align: top;">
                            <span>Imagen ${index + 1}</span>
                        </div>
                    `;
                });
                clothingPreview.innerHTML = previewHTML;
                
                console.log(`✅ ${clothingImages.length} imágenes de productos encontradas`);
                updateProcessButton();
            } else {
                clothingPreview.innerHTML = '<p style="color: #666;">No se encontraron imágenes de productos en esta página</p>';
                console.log('❌ No se encontraron imágenes de productos');
            }
        }, 500); // Esperar 500ms para que las imágenes se carguen
    }

    // Determinar si es imagen de producto
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
            'user', 'profile', 'avatar', 'notification', 'badge'
        ];
        
        // Verificar patrones de exclusión
        for (const pattern of skipPatterns) {
            if (srcLower.includes(pattern) || altLower.includes(pattern) || 
                classLower.includes(pattern) || idLower.includes(pattern)) {
                return false;
            }
        }
        
        // Patrones de productos (más específicos)
        const productPatterns = [
            'product', 'item', 'clothing', 'dress', 'shirt', 'pants',
            'jacket', 'sweater', 'shoes', 'bag', 'accessory', 'model',
            'main', 'gallery', 'hero', 'featured', 'thumbnail', 'image',
            'photo', 'picture', 'preview', 'zoom', 'large', 'medium'
        ];
        
        // Verificar patrones de productos
        for (const pattern of productPatterns) {
            if (srcLower.includes(pattern) || altLower.includes(pattern) || 
                classLower.includes(pattern) || idLower.includes(pattern)) {
                return true;
            }
        }
        
        // Verificar extensiones de imagen válidas
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
        const hasValidExtension = imageExtensions.some(ext => srcLower.includes(ext));
        
        // Verificar que la imagen tenga un tamaño mínimo (no sea muy pequeña)
        const isLargeEnough = imgElement.naturalWidth > 100 && imgElement.naturalHeight > 100;
        
        // Si tiene extensión válida y es lo suficientemente grande, probablemente es un producto
        if (hasValidExtension && isLargeEnough) {
            return true;
        }
        
        return false;
    }

        // Actualizar botón de procesar
        function updateProcessButton() {
            const processButton = document.getElementById('process-button');
            const hasUserPhoto = userPhotoFile !== null || selectedInstagramPhoto !== null;
            const hasClothingImages = clothingImages.length > 0;
            
            processButton.disabled = !(hasUserPhoto && hasClothingImages);
        }

        // Procesar imágenes
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
                
                clothingImages.forEach((img, index) => {
                    formData.append(`clothing_url_${index}`, img.src);
                });

                const response = await fetch(XSMLX_CONFIG.backendUrl, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Error del servidor: ${response.status}`);
                }

                const result = await response.json();
                
                if (result.success) {
                    showResult(result.image_url);
                } else {
                    throw new Error(result.error || 'Error desconocido');
                }

            } catch (error) {
                console.error('Error:', error);
                showError(`Error al procesar: ${error.message}`);
            } finally {
                document.getElementById('loading').style.display = 'none';
                document.getElementById('process-button').disabled = false;
            }
        };

    // Mostrar resultado
    function showResult(imageUrl) {
        const resultDiv = document.getElementById('result');
        const resultImage = document.getElementById('result-image');
        const downloadLink = document.getElementById('download-link');
        
        // Convertir URL relativa a absoluta
        const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : 
            XSMLX_CONFIG.backendUrl.replace('/api/process', '') + imageUrl;
        
        resultImage.src = fullImageUrl;
        downloadLink.href = fullImageUrl;
        downloadLink.download = `virtual_try_on_${Date.now()}.png`;
        
        resultDiv.style.display = 'block';
    }

    // Mostrar error
    function showError(message) {
        const errorDiv = document.getElementById('error');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    // Inicializar widget
    function initWidget() {
        // Crear widget
        const widgetContainer = document.createElement('div');
        widgetContainer.innerHTML = createXsmlxWidget();
        document.body.appendChild(widgetContainer);
        
        // Crear modal
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = createXsmlxModal();
        document.body.appendChild(modalContainer);
        
        // Cerrar modal al hacer clic fuera
        document.getElementById('xsmlx-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeXsmlxModal();
            }
        });
        
        console.log('XSMLX Widget cargado en:', window.location.href);
        console.log('Botón XSMLX creado y visible en la página');
    }

    // Cargar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }

    // CSS para animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

})();
