import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      name: "Ru"
    }
  }

  setLanguage(name) {
    this.setState({name}, `Изменение языка интерфейса на ${name}`);
  }

}

export default Language;
