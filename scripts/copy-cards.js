const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\nandi\\.gemini\\antigravity-ide\\brain\\b1a748db-846f-443c-a966-707c86094c17';
const destDir = path.join(__dirname, '..', 'public', 'printables-images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { src: 'card_all_about_me_1793191701977.jpg', dest: 'card-01-all-about-me.jpg' },
  { src: 'card_superhero_cards_1793191727268.jpg', dest: 'card-02-superhero-cards.jpg' },
  { src: 'card_friendly_monster_1793191747372.jpg', dest: 'card-03-friendly-monster.jpg' },
  { src: 'card_magical_pet_1793191767557.jpg', dest: 'card-04-magical-pet.jpg' },
  { src: 'card_alien_rover_1793191788660.jpg', dest: 'card-05-alien-rover.jpg' },
  { src: 'card_dream_treehouse_1793191820080.jpg', dest: 'card-06-dream-treehouse.jpg' },
  { src: 'card_story_dice_1793191849217.jpg', dest: 'card-07-story-dice.jpg' },
  { src: 'card_funny_comic_1793191877595.jpg', dest: 'card-08-funny-comic.jpg' },
  { src: 'card_robot_helper_1793191905943.jpg', dest: 'card-09-robot-helper.jpg' },
  { src: 'card_pizza_fractions_1793191926485.jpg', dest: 'card-10-pizza-fractions.jpg' },
  { src: 'card_sea_city_1793191970909.jpg', dest: 'card-11-city-under-sea.jpg' },
  { src: 'card_mystery_door_1793192005896.jpg', dest: 'card-12-mystery-door.jpg' },
  { src: 'card_missing_shadow_1793192032443.jpg', dest: 'card-13-missing-shadow.jpg' },
];

for (const m of mappings) {
  const srcPath = path.join(srcDir, m.src);
  const destPath = path.join(destDir, m.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${m.dest}`);
  } else {
    console.warn(`File not found: ${srcPath}`);
  }
}
console.log('Finished copying generated images.');
