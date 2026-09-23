/**
 * ============================================================================
 * TOP GEAR CLÁSICO - SCRIPT PRINCIPAL DE INTERACCIÓN Y ACCESIBILIDAD
 * ============================================================================
 * Maneja:
 * 1. Menú responsive y accesibilidad móvil (ARIA y Keyboard Navigation)
 * 2. Dropdown interactivo para escritorio y móvil
 * 3. Galería interactiva: filtros y modal Lightbox
 * 4. Validación avanzada del formulario de contacto
 * 5. ScrollSpy para resaltar secciones activas en la navegación
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. NAVEGACIÓN MÓVIL Y ACCESIBILIDAD ARIA
  // ==========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('menu-principal');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const dropdownToggle = document.getElementById('dropdown-episodios');
  const dropdownParent = dropdownToggle ? dropdownToggle.closest('.has-dropdown') : null;

  // Toggle del menú hamburguesa
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open');

      // Prevenir scroll de fondo en móviles al abrir el menú
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace de navegación directo
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // ==========================================================================
  // 2. DROPDOWN SUBMENÚ (CLICK Y SOPORTE DE TECLADO)
  // ==========================================================================
  if (dropdownToggle && dropdownParent) {
    // Alternar dropdown en móvil y click de escritorio
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownParent.classList.contains('is-open');
      dropdownParent.classList.toggle('is-open', !isOpen);
      dropdownToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Cerrar submenú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!dropdownParent.contains(e.target)) {
        dropdownParent.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Cerrar submenú al hacer clic en cualquiera de sus enlaces
    const dropdownLinks = dropdownParent.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(item => {
      item.addEventListener('click', () => {
        dropdownParent.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        if (mainNav && mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // ==========================================================================
  // 3. FILTROS DE LA GALERÍA
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Manejar estado visual y accesibilidad ARIA de los botones
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');

      // Filtrar los elementos
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('is-hidden');
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  // ==========================================================================
  // 4. MODAL LIGHTBOX PARA LA GALERÍA
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const galleryTriggers = document.querySelectorAll('.gallery-trigger');
  let lastFocusedElement = null;

  function openLightbox(trigger) {
    const src = trigger.getAttribute('data-img-src');
    const alt = trigger.getAttribute('data-img-alt') || '';
    const caption = trigger.getAttribute('data-caption') || '';

    if (lightboxImg && lightboxCaption && lightboxModal) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightboxCaption.textContent = caption;

      lastFocusedElement = trigger; // Guardar el botón que lo activó para devolver el foco
      lightboxModal.classList.add('is-open');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Foco en el botón de cerrar para accesibilidad
      if (lightboxClose) {
        lightboxClose.focus();
      }
    }
  }

  function closeLightbox() {
    if (lightboxModal && lightboxModal.classList.contains('is-open')) {
      lightboxModal.classList.remove('is-open');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (lightboxImg) {
        lightboxImg.src = '';
      }

      // Devolver el foco al elemento que abrió el modal
      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }
  }

  galleryTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(trigger);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', closeLightbox);
  }

  // Cerrar Lightbox y Menús con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();

      if (dropdownParent && dropdownParent.classList.contains('is-open')) {
        dropdownParent.classList.remove('is-open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownToggle.focus();
      }

      if (mainNav && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    }
  });

  // ==========================================================================
  // 5. VALIDACIÓN DEL FORMULARIO DE CONTACTO (HTML5 + FEEDBACK DINÁMICO)
  // ==========================================================================
  const form = document.getElementById('form-contacto');
  const formStatus = document.getElementById('form-status');
  const btnSubmit = document.getElementById('btn-submit');

  if (form) {
    const inputs = form.querySelectorAll('.form-input[required]');

    // Función auxiliar para mostrar error individual
    const validateField = (field) => {
      const errorSpan = document.getElementById(`${field.id}-error`);
      let isValid = true;
      let message = '';

      if (field.validity.valueMissing) {
        message = 'Este campo es obligatorio.';
        isValid = false;
      } else if (field.type === 'email' && field.validity.typeMismatch) {
        message = 'Por favor ingresa un formato de correo válido (ej. usuario@dominio.com).';
        isValid = false;
      } else if (field.validity.tooShort) {
        message = `Debe contener al menos ${field.minLength} caracteres.`;
        isValid = false;
      }

      if (!isValid) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        if (errorSpan) errorSpan.textContent = message;
      } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        if (errorSpan) errorSpan.textContent = '';
      }

      return isValid;
    };

    // Validar en tiempo real al escribir o perder el foco
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(input);
        }
      });
    });

    // Envío del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let formIsValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          formIsValid = false;
        }
      });

      if (formIsValid) {
        // Simulación de envío exitoso con estado de carga
        const originalBtnText = btnSubmit.innerHTML;
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<span>Enviando...</span>';

        setTimeout(() => {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = originalBtnText;

          if (formStatus) {
            formStatus.className = 'form-status is-success';
            formStatus.textContent = '✓ ¡Mensaje recibido! Gracias por contactar al equipo de Top Gear. Te responderemos a toda velocidad.';
          }

          form.reset();
          inputs.forEach(input => input.classList.remove('is-valid'));

          // Ocultar mensaje de éxito tras 6 segundos
          setTimeout(() => {
            if (formStatus) {
              formStatus.className = 'form-status';
              formStatus.textContent = '';
            }
          }, 6000);
        }, 800);
      } else {
        if (formStatus) {
          formStatus.className = 'form-status is-error';
          formStatus.textContent = '⚠️ Por favor, revisa y corrige los campos obligatorios marcados en rojo.';
        }
      }
    });
  }

  // ==========================================================================
  // 6. SCROLLSPY (DESTACAR LINK ACTIVO SEGÚN LA POSICIÓN EN LA PÁGINA)
  // ==========================================================================
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/') || 
                     !window.location.pathname.includes('.html');

  if (isHomePage) {
    const sections = document.querySelectorAll('section[id]');
    const inPageNavLinks = document.querySelectorAll('.nav-list a.nav-link[href^="#"], .nav-list a.nav-link[href^="index.html#"]');

    if ('IntersectionObserver' in window && sections.length > 0 && inPageNavLinks.length > 0) {
      const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            
            inPageNavLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${currentId}` || href === `index.html#${currentId}`) {
                link.classList.add('active');
              } else if (href && (href.startsWith('#') || href.startsWith('index.html#'))) {
                link.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      sections.forEach(sec => sectionObserver.observe(sec));
    }
  }

});
