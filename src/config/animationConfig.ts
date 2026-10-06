// Titles and sequence follow animations/animation_names.rtfd.
const animationEntries = [
  { filename: "2022-07-21_12-07-01_UTC.mp4", title: "Truuskuli’s Tea" },
  { filename: "2020-09-19_23-55-07_UTC.mp4", title: "Rhapsody in Blue" },
  { filename: "efraims-journey-ep1V5.mp4", title: "Efraim’s Journey" },
  { filename: "2022-08-24_08-01-37_UTC.mp4", title: "How to make hummus" },
  { filename: "2022-06-21_12-10-41_UTC.mp4", title: "The Sacrifice" },
  { filename: "2022-03-06_14-27-56_UTC.mp4", title: "Doggie Doggereeno" },
  { filename: "2022-03-25_14-37-36_UTC.mp4", title: "Doggy Dogirowsky" },
  { filename: "2022-02-09_12-51-03_UTC.mp4", title: "I gotta have something to believe in" },
  { filename: "2021-12-26_18-13-56_UTC.mp4", title: "Woody riding the chaise longue" },
  { filename: "2022-05-07_11-24-36_UTC.mp4", title: "We have to look at what you dream" },
  { filename: "2021-11-22_21-53-07_UTC.mp4", title: "Efraim lost in the forest" },
  { filename: "Berta_espejo_v1.mp4", title: "Bathroom" },
  { filename: "galgo_H_skate_V1_loop.mp4", title: "Skater Galgo" },
  { filename: "2022-10-07_12-58-07_UTC_janis1.mp4", title: "Janis the pimp part I" },
  { filename: "2022-11-02_10-02-39_UTC_janis2.mp4", title: "Janis the pimp part II" },
  { filename: "2020-11-07_23-02-59_UTC.mp4", title: "Nestor dancing with the broom" },
  { filename: "REEL_ELVA_GRANADOS_12_2022.mp4", title: "old reel from ECIB" },
  { filename: "2021-03-27_15-57-39_UTC.mp4", title: "Rabbit" },
  { filename: "2021-12-15_23-07-49_UTC.mp4", title: "Chihuahua" },
] as const;

export const animations = animationEntries.map(({ filename, title }, index) => ({
  id: index + 1,
  title,
  video: `assets/animations/${filename}`,
  poster: `assets/animations/${filename.replace(/\.mp4$/, ".jpg")}`,
}));
