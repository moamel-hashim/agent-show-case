/* exported data */

var data = {
  view: 'home-page',
  favorite: [],
  id: 0,
  character: [],
  currentAgent: '',
  gifLookUp: {
    Breach: ['./images/breach/flashpoint.gif', './images/breach/fault line.gif', './images/breach/aftershock.gif', './images/breach/rolling thunder.gif'],
    Raze: ['./images/raze/blast pack.gif', './images/raze/paint shells.gif', './images/raze/Boom bot.gif', './images/raze/showstopper.gif'],
    Chamber: ['./images/chamber/RENDEZVOUS.gif', './images/chamber/trademark.gif', './images/chamber/headhunter.gif', './images/chamber/TOUR DE FORCE.gif'],
    'KAY/O': ['./images/kayo/flash.gif', './images/kayo/zeropoint.gif', './images/kayo/fragment.gif', './images/kayo/nullcmd.gif'],
    Skye: ['./images/skye/trailblazer.gif', './images/skye/guiding light.gif', './images/skye/regrowth.gif', './images/skye/seekers.gif'],
    Cypher: ['./images/cypher/cyber cage.gif', './images/cypher/nerual theft.gif', './images/cypher/spycam.gif', './images/cypher/trapwire.gif'],
    Sova: ['./images/sova/shock bolt.gif', './images/sova/recon bolt.gif', './images/sova/owl drone.gif', './images/sova/hunter\'s fury.gif'],
    Killjoy: ['./images/killjoy/alarmbot.gif', './images/killjoy/turret.gif', './images/killjoy/nanoswarm.gif', './images/killjoy/lockdown.gif'],
    Viper: ['./images/viper/poision cloud.gif', './images/viper/toxic screen.gif', './images/viper/snake bite.gif', './images/viper/vipers pit.gif'],
    Phoenix: ['./images/phenix/curveball.gif', './images/phenix/hot hands.gif', './images/phenix/blaze.gif', './images/phenix/run it back.gif'],
    Astra: ['./images/astra/nova pulse.gif', './images/astra/nebula.gif', './images/astra/gravity well.gif', './images/astra/astral form.gif'],
    Brimstone: ['./images/brimstone/incendiary.gif', './images/brimstone/sky smoke.gif', './images/brimstone/stim beacon.gif', './images/brimstone/orbital strike.gif'],
    Neon: ['./images/neon/relay bolt.gif', './images/neon/high gear.gif', './images/neon/fast lane.gif', './images/neon/overdrive.gif'],
    Yoru: ['./images/yoru/blindside.gif', './images/yoru/gatecrash.gif', './images/yoru/fakeout.gif', './images/yoru/dimensional drift.gif'],
    Sage: ['./images/sage/slow orb.gif', './images/sage/helaing orb.gif', './images/sage/barrier orb.gif', './images/sage/resurrection.gif'],
    Reyna: ['./images/reyna/devour.gif', './images/reyna/dismiss.gif', './images/reyna/leer.gif', './images/reyna/empress.gif'],
    Omen: ['./images/omen/paranoia.gif', './images/omen/dark cover.gif', './images/omen/shrouded step.gif', './images/omen/from the shadows.gif'],
    Jett: ['./images/jett/updraft.gif', './images/jett/tailwind.gif', './images/jett/cloudburst.gif', './images/jett/blade storm.gif']
  }
};

const previousDataJSON = localStorage.getItem('AJAX');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', BeforeUnloadHandler);
function BeforeUnloadHandler(event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('AJAX', dataJSON);
}
