export function random(len: number) {
  let options = "dbudqwud28ey198eh12ieh91eh0dci%$%^&I*Y*Y";
  let length = options.length;
  let ans = "";

  for (let i = 0; i < len; i++) {
    ans += options[Math.floor(Math.random() * length)];
  }

  return ans;
}
