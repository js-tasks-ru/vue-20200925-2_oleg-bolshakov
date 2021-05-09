export default {
  // Экземпляр компонента TopProgressBar. Может быть вне объекта.
  instance: null, 

  // Можно добавить метод сохранения экземпляра
  setInstance(instance) {
    this.instance = instance;
  }, 

  // Метод запуска прогресса
  start() { 
    // Взаимодействует с экземпляром компонента
    // (не забывайте о проверках на наличие экземпляра)
    if ( typeof this.instance.start === 'function' ) {
      this.instance.start();
    }  
  },
  finish() { 
    if ( typeof this.instance.finish === 'function' ) {
      this.instance.finish();
    }  
  },
  fail() { 
    if ( typeof this.instance.fail === 'function' ) {
      this.instance.fail();
    }  
  },
};