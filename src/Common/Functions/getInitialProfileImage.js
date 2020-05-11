const colors = [
  { backColor: '4daab5', fontColor: 'ffffff' },
  { backColor: 'b5c8cb', fontColor: 'ffffff' },
  { backColor: 'e6f3f4', fontColor: '4daab5' },
  { backColor: 'f4f7f8', fontColor: 'b5c8cb' }
];

function getRandomColor() {
  const min = 0;
  const max = colors.length - 1;
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return colors[result];
}

function getInitialProfileImage(name) {
  const initialsFromNames = name ? name[0] : 'b';
  const { backColor, fontColor } = getRandomColor();
  return `https://ui-avatars.com/api/?name=${initialsFromNames}&background=${backColor}&color=${fontColor}&size=128&rounded=true&bold=true`;
}

export default getInitialProfileImage;
