// src/components/reactbits/CrystalizedBall.jsx
// Animated plasma/crystal ball using OGL WebGL
// preset="plasma", color prop, theme prop
import { useEffect, useRef } from 'react';
import './CrystalizedBall.css';

export default function CrystalizedBall({
  preset = 'plasma',
  color = '#2C5A43',
  theme = 'light',
  size = 340,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const glRef = useRef(null);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Parse hex color to vec3
    const hexToVec3 = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    };

    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) return;
    glRef.current = gl;

    const vert = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Plasma shader
    const frag = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec3 u_color;

      float plasma(vec2 p, float t) {
        float v = 0.0;
        v += sin(p.x * 3.0 + t);
        v += sin(p.y * 3.0 + t * 0.7);
        v += sin((p.x + p.y) * 3.0 + t * 0.5);
        float cx = p.x + 0.5 * sin(t * 0.3);
        float cy = p.y + 0.5 * cos(t * 0.2);
        v += sin(sqrt(cx * cx + cy * cy + 1.0) * 5.0 - t);
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
        float r = length(uv);
        
        // Circle mask with soft edge
        float mask = 1.0 - smoothstep(0.85, 1.0, r);
        
        float t = u_time * 0.4;
        float v = plasma(uv, t);
        float v2 = plasma(uv * 1.3 + 0.4, t * 1.1);
        
        // Color based on u_color, shift hue with plasma
        vec3 baseColor = u_color;
        vec3 altColor = vec3(baseColor.z * 0.8 + 0.2, baseColor.x * 0.9 + 0.1, baseColor.y);
        
        float blend = sin(v * 1.5) * 0.5 + 0.5;
        float blend2 = cos(v2 * 1.2) * 0.5 + 0.5;
        
        vec3 col = mix(baseColor, altColor, blend);
        col = mix(col, vec3(0.9, 0.95, 0.9), blend2 * 0.3);
        
        // Highlight
        col += vec3(1.0) * pow(max(0.0, 1.0 - r * 1.5), 3.0) * 0.3;
        
        // Rim darkening
        col *= 1.0 - smoothstep(0.6, 0.9, r) * 0.5;
        
        gl_FragColor = vec4(col, mask);
      }
    `;

    const createShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vert);
    const fs = createShader(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const colorLoc = gl.getUniformLocation(program, 'u_color');

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const [r, g, b] = hexToVec3(color);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform3f(colorLoc, r, g, b);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [color, preset, prefersReduced]);

  const bg = theme === 'light'
    ? 'radial-gradient(ellipse at 30% 30%, #d4e6cc 0%, #B9D1B0 60%, #8fb384 100%)'
    : 'radial-gradient(ellipse at 30% 30%, #1e3e2e 0%, #2C5A43 60%, #1a2e22 100%)';

  return (
    <div
      className="crystalized-ball"
      style={{ width: size, height: size, background: bg }}
      role="img"
      aria-label="Decorative animated plasma orb"
    >
      {prefersReduced ? (
        <div
          className="crystalized-ball__static"
          style={{ background: bg, opacity: 0.8 }}
          aria-hidden="true"
        />
      ) : (
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="crystalized-ball__canvas"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
