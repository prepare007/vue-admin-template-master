<template>
  <div id="container" />
</template>

<script>
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
export default {

  name: 'ThreeTest',

  data() {
    return {

      camera: null,

      scene: null,

      renderer: null,

      mesh: null

    }
  },

  mounted() {
    this.init()

    this.animate()
  },

  methods: {

    init() {
      const container = document.getElementById('container')

      this.camera = new Three.PerspectiveCamera(

        45,

        container.clientWidth / container.clientHeight,

        0.1,

        5000

      )

      this.camera.position.z = (container.clientWidth / container.clientHeight) * 100
      this.camera.position.y = (container.clientHeight / 2) / this.camera.aspect
      this.camera.position.x = (container.clientWidth / 2) / this.camera.aspect

      this.scene = new Three.Scene()
      const loader = new GLTFLoader()
      loader.load('/gltf/girlscene.gltf', (gltf) => {
        const model = gltf.scene
        // 添加这段代码
        // 遍历模型每部分
      /*  model.traverse((o) => {
          // 将图片作为纹理加载
          // eslint-disable-next-line no-undef
          const explosionTexture = new Three.TextureLoader().load(
            '/gltf/textures/lambert7SG_baseColor.png'
          )
          // 调整纹理图的方向
          explosionTexture.flipY = true
          // 将纹理图生成基础网格材质(MeshBasicMaterial)
          const material = new Three.MeshBasicMaterial({
            map: explosionTexture
          })
          // 给模型每部分上材质
          o.material = material
        })*/

        this.scene.add(model)
        this.animate()
      })
      new Three.DirectionalLight(0xffffff, 1).add(this.scene)
      this.renderer = new Three.WebGLRenderer({ antialias: true })

      this.renderer.setSize(container.clientWidth, container.clientHeight)

      container.appendChild(this.renderer.domElement)
      const control = new OrbitControls(this.camera, this.renderer.domElement)
      control.addEventListener('change', this.animate)
    },

    animate() {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }

  }
}
</script>

<style >
#container {

  height: 400px;

}
</style>
