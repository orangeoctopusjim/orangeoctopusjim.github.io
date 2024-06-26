#define BG_COLOR vec3(0.05, 0.35, 0.75)
#define NB_POINTS 100.0

uniform float u_time;
uniform vec2 u_resolution;
uniform float intensity;

mat2 Rot(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

vec2 Hash22(vec2 p) {
  vec3 a = fract(p.xyx * vec3(129.23, 348.45, 677.78));
  a += dot(a, a + -87.65);
  return fract(vec2(a.x * a.y, a.y * a.z));
}

void main() {
  // Get coords normallized according to Y resolution. Screen displays uv
  // between -1/+1
  vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / u_resolution.y;

  // Background color
  vec3 bg = BG_COLOR;
  vec4 col = vec4(bg, 1.);

  // Time flow
  float time = u_time / 2.0;

  // Scale viewport
  uv *= 3.0;

  // Apply sine wave
  uv.y += sin((125.45 + time) * .2) + sin(0.5 * (uv.x + time));

  // Prepare voronoi loop (using 3x3 grid)
  vec2 id = floor(uv);
  vec2 gv = fract(uv) - 0.5;
  float minDist = 1000.0;

  // Grid loop
  for (float dx = -1.0; dx <= 1.0; dx += 1.0) {
    for (float dy = -1.0; dy <= 1.0; dy += 1.0) {
      vec2 offset = vec2(dx, dy);
      vec2 h = Hash22(id + offset);
      vec2 p = offset + sin(h * (time + 125.87)) * 0.5;
      p -= gv;
      float d = length(p);
      if (d < minDist) {
        minDist = min(minDist, d);
      }
    }
  }

  // Voronoi color
  float a = sin(u_time * 0.05235);
  a = abs(a) * 0.5; // 0 / +0.5
  a *= 0.1;

  float b = sin(u_time * 0.1235);
  b = abs(b) * 0.5 + 0.5; // +0.5 / +1
  b *= (3.0 - 2. * clamp(intensity * 1.5, 0., 1.));

  float c = smoothstep(a, b, minDist * minDist);
  col.rgb += vec3(c);

  // Output
  gl_FragColor = col;
}