const Mode = {
  demoToggled: false,

  isDemoToggled() {
    return this.demoToggled;
  },

  updateDemoToggled(toggled: boolean) {
    this.demoToggled = toggled;
  },
};

export default Mode;
