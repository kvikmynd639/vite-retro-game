class Resources {
  constructor() {
    // sprites for bg
    this.toLoad = {
      sky: "/sprites/butterful-sky.png",
      ground: "/sprites/butterful-map.png",
      hero: '/sprites/hero-sheet.png',
      //to be fixed these sprites bs-s for ducky
      idle: "/sprites/idle.png",
      walking:'/sprites/jump.png',
      roll: '/sprites/roll_1.png',
      tilt: '/sprites/u_tilt.png',
      shadow: "/sprites/shadow.png",
      rod: "/sprites/rod.png",
      heart: "/sprites/heart.png"
    };

    // object bucket for image storing
    this.images = {};

    // Load each image
    Object.keys(this.toLoad).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false
      }
      img.onload = () => {
        this.images[key].isLoaded = true;
      }
    })
  }
}

export const resources = new Resources();
