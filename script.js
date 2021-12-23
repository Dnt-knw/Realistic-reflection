      onload = setTimeout(main, 250);

      function main() {
        const backgroundSelectionContainer = document.getElementById('background-selection-container');
        const selectResolutionContainer = document.getElementById('select-resolution-container');
        const mainContainer = document.getElementById('main-container');
        const loadingContainer = document.getElementById('loading-container');

        const resolutionSelectionButtons = document.querySelectorAll('.resolution-selection-button');
        const backgroundSelectionButton = document.querySelectorAll('.background-selection-button');

        const backgroundInfo = document.getElementById('backgroundInfo');
        const loadingCircles = document.querySelectorAll('.circle');

        let resolution = null;

        resolutionSelectionButtons.forEach(button => {
          button.onclick = e => {
            resolution = e.target.textContent;
            selectResolutionContainer.style.display = 'none';
            backgroundSelectionContainer.style.display = 'block';
          };
        });

        let wasLoaded = false;
        const backgroundNames = ['ballroom', 'blaubeuren_church_square', 'kloppenheim', 'lythwood_field', 'misty_pines',
          'modern_buildings_night', 'portland', 'rathaus', 'shanghai', 'tiergarten',
          'umhlanga_sunrise', 'warehouse_with_lights', 'lythwood_terrace', 'outdoor_umbrellas', 'glass_passage',
          'theater', 'adams_place_bridge', 'vatican_road', 'mpumalanga_veld', 'mosaic_tunnel'
        ];

        let counter = 0,
          n;
        const timer = setInterval(() => {
          counter === 10 ? clearInterval(timer) : counter++;
          n = Math.floor(Math.random() * backgroundNames.length);
        }, 0);

        backgroundSelectionButton.forEach(button => {
          button.onclick = e => {
            backgroundSelectionContainer.style.display = 'none';
            loadingContainer.style.display = 'block';

            let ms = 0;
            loadingCircles.forEach(c => setTimeout(() => c.classList.add('run-loading-animation'), ms += 200));

            const t = setInterval(() => {
              if (wasLoaded) {
                clearInterval(t);
                setTimeout(() => {
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, 100, 100);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, -100, -100);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, -100, 100);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, 100, -100);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, 100, 0);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, -100, 0);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, 0, 100);
                  makeMesh(new THREE.BoxBufferGeometry(50, 50, 50), 0, 0, -100);
                  makeMesh(new THREE.IcosahedronGeometry(50, 12), 0, 0, 0, false, false);

                  render();
                }, 250);
              }
            }, 100);

            if (e.target.textContent in urls) {
              loadBackground(resolution.includes('2048') && resolution.includes('1024') ? urls[`${e.target.textContent}`][0] : urls[`${e.target.textContent}`][1]);
              backgroundInfo.textContent = `${e.target.textContent} ${resolution}`;
            } else {
              loadBackground(resolution.includes('2048') && resolution.includes('1024') ? urls[`${backgroundNames[n]}`][0] : urls[`${backgroundNames[n]}`][1]);
              backgroundInfo.textContent = `${backgroundNames[n]} ${resolution}`;
            }
          };
        });

        const canvas = document.getElementById('c');
        const statsInfo = document.getElementById('statsInfo');

        const w = window.innerWidth;
        const h = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
        });
        renderer.setSize(w, h);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;

        const fov = 60;
        const aspect = w / h;
        const near = 0.1;
        const far = 1850;

        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 0, 100);

        const urls = {
          ballroom: ['https://dl.dropbox.com/s/hy4u7dr10dyime5/ballroom_2K.jpg', 'https://dl.dropbox.com/s/ztcsftba02ljzsx/ballroom_4K.jpg'],
          blaubeuren_church_square: ['https://dl.dropbox.com/s/ejf1kvap9gqyykf/blaubeuren_church_square_2K.jpg', 'https://dl.dropbox.com/s/9rql62afe3ck7oo/blaubeuren_church_square_4K.jpg'],
          kloppenheim: ['https://dl.dropbox.com/s/pkurscge7a6m5cr/kloppenheim_02_2K.jpg', 'https://dl.dropbox.com/s/i8o04okj625hc1o/kloppenheim_02_4K.jpg'],
          lythwood_field: ['https://dl.dropbox.com/s/412gihhvldpk0h2/lythwood_field_2K.jpg', 'https://dl.dropbox.com/s/gkb1ihft4xii11n/lythwood_field_4K.jpg'],
          misty_pines: ['https://dl.dropbox.com/s/qhpjaoyh0wfxv94/misty_pines_2K.jpg', 'https://dl.dropbox.com/s/250d1r0veon3wky/misty_pines_4K.jpg'],
          modern_buildings_night: ['https://dl.dropbox.com/s/iy13jmz5wkeg8ou/modern_buildings_night_2K.jpg', 'https://dl.dropbox.com/s/upsagn957nio5h4/modern_buildings_night_4K.jpg'],
          portland: ['https://dl.dropbox.com/s/5zoh30x2tffaubi/portland_landing_pad_2K.jpg', 'https://dl.dropbox.com/s/wlthubb3vcu9qli/portland_landing_pad_4K.jpg'],
          rathaus: ['https://dl.dropbox.com/s/r1kol5qgzercuiw/rathaus_2K.jpg', 'https://dl.dropbox.com/s/wnz2p0ldnl8uhpg/rathaus_4K.jpg'],
          shanghai: ['https://dl.dropbox.com/s/mgi2lelqgqj1ath/shanghai_2K.jpg', 'https://dl.dropbox.com/s/wqwhzuse8aujmz5/shanghai_4K.jpg'],
          tiergarten: ['https://dl.dropbox.com/s/fa5by4pv1so7ylb/tiergarten_2K.jpg', 'https://dl.dropbox.com/s/iesmth183hkothg/tiergarten_4K.jpg'],
          umhlanga_sunrise: ['https://dl.dropbox.com/s/6oxqqywgq1av7ri/umhlanga_sunrise_2K.jpg', 'https://dl.dropbox.com/s/lh68fwphjvwlv3p/umhlanga_sunrise_4K.jpg'],
          warehouse_with_lights: ['https://dl.dropbox.com/s/mmuyxpenkato5y6/warehouse_with_lights_2K.jpg', 'https://dl.dropbox.com/s/da2eo8qhm4o4o3c/warehouse_with_lights_4K.jpg'],
          lythwood_terrace: ['https://dl.dropbox.com/s/ojwbe326jzanwk7/lythwood_terrace_2K.jpg', 'https://dl.dropbox.com/s/kbhxb8qfaz9qkfi/lythwood_terrace_4K.jpg'],
          outdoor_umbrellas: ['https://dl.dropbox.com/s/stn64z5lj3mudzy/outdoor_umbrellas_2K.jpg', 'https://dl.dropbox.com/s/zray1f94bw29lgi/outdoor_umbrellas_4K.jpg'],
          glass_passage: ['https://dl.dropbox.com/s/olph83dz8kwlk1l/glass_passage_2K.jpg', 'https://dl.dropbox.com/s/v9otisxpv65djgv/glass_passage_4K.jpg'],
          theater: ['https://dl.dropbox.com/s/o3df58iaus9pxrb/theater_2K.jpg', 'https://dl.dropbox.com/s/kfpn23yfepvtuah/theater_4K.jpg'],
          adams_place_bridge: ['https://dl.dropbox.com/s/m35no2hp6ozs23g/adams_place_bridge_2K.jpg', 'https://dl.dropbox.com/s/cx1pdo49gfviojw/adams_place_bridge_4K.jpg'],
          vatican_road: ['https://dl.dropbox.com/s/c3p5fo4y135m2lq/vatican_road_2K.jpg', 'https://dl.dropbox.com/s/m02utqismgt9chl/vatican_road_4K.jpg'],
          mpumalanga_veld: ['https://dl.dropbox.com/s/jbkuvoo5c9e8rrh/mpumalanga_veld_2K.jpg', 'https://dl.dropbox.com/s/q82zjj8qcpuh10j/mpumalanga_veld_4K.jpg'],
          mosaic_tunnel: ['https://dl.dropbox.com/s/077yucg10cn2req/mosaic_tunnel_2K.jpg', 'https://dl.dropbox.com/s/7reoqwi6k7vyf65/mosaic_tunnel_4K.jpg'],
        };

        const meshes = [];
        const scene = new THREE.Scene();

        const loadBackground = url => {
          new THREE.TextureLoader().load(url, texture => {
            texture.encoding = THREE.sRGBEncoding;
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.anisotropy = resolution.includes('2048') && resolution.includes('1024') ? 1 : 16;
            wasLoaded = true;
            scene.background = texture;
          });
        };

        const timer2 = setInterval(() => {
          if (wasLoaded) {
            setTimeout(() => mainContainer.classList.add('run-loading-animation-2'), 200);
            setTimeout(() => {
              mainContainer.style.display = 'none';
              stats = new Stats();
              statsInfo.append(stats.dom);
            }, 1600);
            clearInterval(timer2);
          }
        }, 500);

        const controls = new THREE.OrbitControls(camera, canvas);
        controls.target.set(0, 0, 0);
        controls.update();
        controls.enablePan = false;
        controls.minDistance = 100;
        controls.maxDistance = 750;

        const makeCubeRenderTarget = () => {
          const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(resolution.includes('2048') && resolution.includes('1024') ? 64 : 256, {
            format: THREE.RGBFormat,
            generateMipmaps: true,
            minFilter: THREE.NearestFilter,
            encoding: THREE.sRGBEncoding,
          });

          cubeRenderTarget.texture.anisotropy = 16;
          const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

          const update = () => {
            cubeCamera.update(renderer, scene);
            requestAnimationFrame(update);
          }

          update();

          return cubeRenderTarget;
        }

        let cb = null;

        const i = setInterval(() => {
          if (wasLoaded) {
            cb = makeCubeRenderTarget();
            clearInterval(i);
          };
        }, 100);

        const makeMesh = (geo, x = 0, y = 0, z = 0, addToArray = true, isCube = true) => {
          let cubeRenderTarget = null;
          if (isCube) {
            cubeRenderTarget = cb;
          } else {
            cubeRenderTarget = new THREE.WebGLCubeRenderTarget(resolution.includes('2048') && resolution.includes('1024') ? 256 : 1024, {
              format: THREE.RGBFormat,
              generateMipmaps: true,
              minFilter: resolution.includes('2048') && resolution.includes('1024') ? THREE.NearestFilter : THREE.LinearMipMapLinearFilter,
              encoding: THREE.sRGBEncoding,
            });

            cubeRenderTarget.texture.anisotropy = 16;
            const cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);

            const update = () => {
              cubeCamera.update(renderer, scene);
              requestAnimationFrame(update);
            }

            update();
          }

          const material = new THREE.MeshBasicMaterial({
            envMap: cubeRenderTarget.texture,
            combine: THREE.MultiplyOperation,
            reflectivity: 1,
          });

          const mesh = new THREE.Mesh(geo, material);

          scene.add(mesh);

          mesh.position.x = x;
          mesh.position.y = y;
          mesh.position.z = z;

          addToArray ? meshes.push(mesh) : null;

          return mesh;
        };

        const onWindowResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', onWindowResize, false);

        let stats = new Stats();

        const render = () => {
          let a = 0;

          meshes.forEach((mesh, idx) => {
            mesh.rotation.x += idx * 0.006 || 0.006;
            mesh.rotation.y += idx * 0.005 || 0.005;
            mesh.rotation.z += idx * 0.004 || 0.004;

            const time = Date.now();

            mesh.position.x = Math.tan(time * 0.0012 + a) * 45;
            a += 10;
          });

          stats.update();
          renderer.render(scene, camera);
          requestAnimationFrame(render);
        }
      };