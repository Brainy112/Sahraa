/* main.js - CONTROLADOR COMPLETO CON FUEGOS ARTIFICIALES MEJORADOS */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos carta
  const envelope = document.getElementById('envelope');
  const cartaCerrada = document.getElementById('carta-cerrada');
  const confirmacion = document.getElementById('confirmacion');
  const cartaCompleta = document.getElementById('carta-completa');
  const content1 = document.getElementById('content1');
  const container = document.getElementById('container');

  const btnSi = document.getElementById('btnSi');
  const btnNo = document.getElementById('btnNo');
  const btnRegalo = document.getElementById('btnRegalo');

  const MiMUsica = document.getElementById('MiMUsica');
  const audio2 = document.getElementById('audio2');

  // Seguridad
  if (!cartaCerrada || !confirmacion || !cartaCompleta) {
    console.warn('Elementos de carta no detectados. Revisar index.html');
  }

  // =========================================
  // CREAR ESTRELLAS DINÁMICAS MEJORADAS
  // =========================================
  function crearEstrellas() {
    document.querySelectorAll('.stars').forEach(stContainer => {
      if (stContainer.dataset.created === '1') return;
      stContainer.dataset.created = '1';
      
      // Crear 80 estrellas (más que antes)
      for (let i = 0; i < 80; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        
        // Tamaños variados
        const size = (Math.random() * 3) + 0.5;
        s.style.width = `${size}px`;
        s.style.height = `${size}px`;
        
        // Posición aleatoria
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        
        // Opacidad y delay aleatorios
        s.style.opacity = `${Math.random() * 0.7 + 0.3}`;
        s.style.animationDelay = `${Math.random() * 3}s`;
        s.style.animationDuration = `${Math.random() * 2 + 2}s`;
        
        stContainer.appendChild(s);
      }
    });
  }

  // =========================================
  // FUEGOS ARTIFICIALES MEJORADOS
  // =========================================
  function crearFuegosArtificiales(callback) {
    const cont = document.createElement('div');
    cont.className = 'fireworks-container';
    cont.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      overflow: hidden;
    `;
    document.body.appendChild(cont);

    const colores = [
      '#ff0844', '#ffb199', '#ffd23f', '#00fff0', 
      '#ff1744', '#ff6b9d', '#c44569', '#f368e0',
      '#00d2ff', '#3742fa', '#5f27cd', '#48dbfb',
      '#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb'
    ];

    let totalFuegos = 40;
    let creados = 0;

    function crearParticula() {
      if (creados >= totalFuegos) {
        setTimeout(() => {
          if (cont && cont.parentNode) cont.parentNode.removeChild(cont);
          if (typeof callback === 'function') callback();
        }, 2500);
        return;
      }

      const f = document.createElement('div');
      const color = colores[Math.floor(Math.random() * colores.length)];
      
      // Posición aleatoria más distribuida
      const x = 10 + Math.random() * 80;
      const y = 10 + Math.random() * 60;
      
      f.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: 10px;
        height: 10px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 
          0 0 10px ${color},
          0 0 20px ${color},
          0 0 30px ${color},
          0 0 40px ${color};
        animation: fireworkExplode 2s ease-out forwards;
        transform-origin: center;
      `;
      
      cont.appendChild(f);
      
      // Crear partículas secundarias más numerosas
      setTimeout(() => crearParticulas(f, color, x, y), 250);
      
      creados++;
      
      // Crear siguiente fuego con delay
      setTimeout(crearParticula, 120);
    }

    function crearParticulas(origen, color, xBase, yBase) {
      const numParticulas = 18;
      
      for (let i = 0; i < numParticulas; i++) {
        const p = document.createElement('div');
        const angulo = (360 / numParticulas) * i;
        const distancia = 100 + Math.random() * 60;
        
        p.style.cssText = `
          position: absolute;
          left: ${xBase}%;
          top: ${yBase}%;
          width: 5px;
          height: 5px;
          background: ${color};
          border-radius: 50%;
          box-shadow: 0 0 10px ${color}, 0 0 20px ${color};
          animation: particleSpread 1.5s ease-out forwards;
          --angle: ${angulo}deg;
          --distance: ${distancia}px;
        `;
        
        cont.appendChild(p);
        
        setTimeout(() => {
          if (p && p.parentNode) p.parentNode.removeChild(p);
        }, 1500);
      }
      
      if (origen && origen.parentNode) {
        origen.parentNode.removeChild(origen);
      }
    }

    // Agregar keyframes si no existen
    if (!document.getElementById('firework-styles')) {
      const style = document.createElement('style');
      style.id = 'firework-styles';
      style.textContent = `
        @keyframes fireworkExplode {
          0% {
            transform: scale(0.1);
            opacity: 1;
          }
          50% {
            transform: scale(2.5);
            opacity: 1;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        
        @keyframes particleSpread {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: 
              translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
              ) 
              scale(0.1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    crearParticula();
  }

  // =========================================
  // EVENTOS DE NAVEGACIÓN
  // =========================================

  // Abrir sobre
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.add('opening');
      setTimeout(() => {
        cartaCerrada.classList.add('oculto');
        confirmacion.classList.remove('oculto');
      }, 900);
    });
  }

  // Botón NO: volver a inicio
  if (btnNo) {
    btnNo.addEventListener('click', () => {
      confirmacion.classList.add('oculto');
      cartaCerrada.classList.remove('oculto');
      if (envelope) envelope.classList.remove('opening');
    });
  }

  // Botón SÍ: mostrar carta completa
  if (btnSi) {
    btnSi.addEventListener('click', () => {
      confirmacion.classList.add('oculto');
      cartaCompleta.classList.remove('oculto');
    });
  }

  // Botón REGALO: fuegos artificiales + pantalla Taliana
  if (btnRegalo) {
    btnRegalo.addEventListener('click', () => {
      cartaCompleta.classList.add('oculto');
      
      crearFuegosArtificiales(() => {
        if (content1) content1.classList.remove('oculto');
      });
    });
  }

  // =========================================
  // FUNCIÓN MOSTRAR FLORES
  // =========================================
  if (typeof window.showFlowers !== 'function') {
    window.showFlowers = function() {
      if (content1) content1.classList.add('oculto');
      if (container) container.classList.remove('oculto');
      try { 
        if (MiMUsica) MiMUsica.play(); 
      } catch(e) {
        console.log('No se pudo reproducir audio:', e);
      }
    };
  }

  // Click en container para cambiar audio
  if (container) {
    container.addEventListener('click', () => {
      try {
        if (MiMUsica && !MiMUsica.paused) MiMUsica.pause();
        if (audio2) audio2.play();
      } catch(e) {
        console.log('Error cambiando audio:', e);
      }
    });
  }

  // =========================================
  // INICIALIZAR
  // =========================================
  crearEstrellas();

  // ESC para volver al inicio
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      confirmacion.classList.add('oculto');
      cartaCompleta.classList.add('oculto');
      content1.classList.add('oculto');
      container.classList.add('oculto');
      cartaCerrada.classList.remove('oculto');
      if (envelope) envelope.classList.remove('opening');
      
      // Pausar audios
      try {
        if (MiMUsica) MiMUsica.pause();
        if (audio2) audio2.pause();
      } catch(e) {}
    }
  });

  console.log('✨ main.js cargado - Sistema completo iniciado');
});
