/**

    Here on top you can find the uniforms for each distortion. 

    // ShaderShaping funcitns
    https://thebookofshaders.com/05/
     Steps 
     1. Write getDistortion in GLSL
     2. Write custom uniforms for tweak parameters. Put them outside the object.
     3. Re-create the GLSl funcion in javascript to get camera paning

     Notes: 
     LookAtAmp AND lookAtOffset are hand tuned to get a good camera panning.
 */

const mountainUniforms = {
  // x, y, z
  uFreq: new THREE.Uniform(new THREE.Vector3(3, 6, 10)),
  uAmp: new THREE.Uniform(new THREE.Vector3(30, 30, 20))
};

const xyUniforms = {
  // x,y
  uFreq: new THREE.Uniform(new THREE.Vector2(5, 2)),
  uAmp: new THREE.Uniform(new THREE.Vector2(25, 15))
};

const LongRaceUniforms = {
  // x, y
  uFreq: new THREE.Uniform(new THREE.Vector2(2, 3)),
  uAmp: new THREE.Uniform(new THREE.Vector2(35, 10))
};

const turbulentUniforms = {
  // x,x, y,y
  uFreq: new THREE.Uniform(new THREE.Vector4(4, 8, 8, 1)),
  uAmp: new THREE.Uniform(new THREE.Vector4(25, 5, 10, 10))
};

const deepUniforms = {
  // x, y
  uFreq: new THREE.Uniform(new THREE.Vector2(4, 8)),
  uAmp: new THREE.Uniform(new THREE.Vector2(10, 20)),
  uPowY: new THREE.Uniform(new THREE.Vector2(20, 2))
};

let nsin = val => Math.sin(val) * 0.5 + 0.5;



const deepDistortionStill = {
  uniforms: deepUniforms,
  getDistortion: `
        uniform vec4 uFreq;
        uniform vec4 uAmp;
        uniform vec2 uPowY;
        float nsin(float val){
        return sin(val) * 0.5+0.5;
        }
    
				#define PI 3.14159265358979
        float getDistortionX(float progress){
            return 
                    (
                        sin(progress * PI * uFreq.x ) * uAmp.x * 2.
                    
                    );
        }
        float getDistortionY(float progress){
            return 
                    (
                        pow(abs(progress * uPowY.x),uPowY.y) + sin(progress * PI * uFreq.y ) * uAmp.y
                    );
        }
        vec3 getDistortion(float progress){
            return vec3(
                getDistortionX(progress)-getDistortionX(0.02) ,
                getDistortionY(progress)- getDistortionY(0.05),
                0.
            );
        }
    `
};

