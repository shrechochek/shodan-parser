const url = 'https://www.shodan.io/search?query=ADB+cmd';
require('dotenv').config();

async function getShodanData() {
  try {
    const response = await fetch(url, {
      headers: {
        'Cookie': `polito="${process.env.COCKIE_POLITO}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.text();

    const subStr = '<li class="hostnames text-secondary">';
    const indices = [];
    let pos = data.indexOf(subStr.toLowerCase());
    while (pos !== -1) {
        indices.push(pos);
        pos = data.indexOf(subStr.toLowerCase(), pos + 1);
    }


    for (const index of indices) {
      posStart = index+subStr.length;
      pos = posStart;

      while (data.slice(pos,pos+5) != "</li>") {
          pos += 1;
      }

      let ip = data.slice(posStart,pos);
      if (ip.length < 16) {
        console.log(ip)
      }
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

getShodanData();