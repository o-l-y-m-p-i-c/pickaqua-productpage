const swiper = new Swiper('.banner-product-slider', {

  speed: 400,
  loop: true,
  navigation: {
    nextEl: '.banner-product-slider .swiper-button-next',
    prevEl: '.banner-product-slider .swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    // type: 'bullets',
  }
  // spaceBetween: 100,
});


const dashItem = document.querySelectorAll('.corn-item')

let i = 0
let flag = true

// setInterval(() => {

//   if (flag) {
//     i++
//     i >= 76 ? flag = false : flag = true

//   }
//   if (!flag) {
//     i--
//     i <= 0 ? flag = true : fakg = false

//   }


dashItem.forEach(item => {
  const progress = item.querySelector('.circle-container__progress')
  const value = item.querySelector('.corn-value')
  if (progress) {
    const parent = progress.closest('.js-circle-item')
    const maxValue = parent.getAttribute('data-max-value')
    const currentValue = parent.getAttribute('data-current-value')
    const step = Number((Number(currentValue) / Number(maxValue)).toFixed(5)) * 10
    let flag = true
    if (flag) {
      const i = onLoadCircleDiagram(Number(currentValue), progress, step)
      if (!i) {
        flag = i
      }
    }

  }

})
// }, 100);
// 
function onLoadCircleDiagram(maxValue, item, step) {
  let mainValue = 0
  let interval = setInterval(load, 100);
  // const flag = true
  function load() {
    if (mainValue >= maxValue) {
      clearInterval(interval);
      // flag = false
      return false
    } else {
      mainValue += step;
      item.style.strokeDashoffset = 75 - mainValue

    }
  }

}


const zhanBtn = document.querySelector('.zhan-btn')
zhanBtn.onclick = (e) => {
  e.currentTarget.classList.toggle('active')
  const contentWrapper = e.currentTarget.querySelector('.zhan-content')
  const contentInnerHeight = e.currentTarget.querySelector('.zhan-content-inner').getBoundingClientRect().height - 6
  if (e.currentTarget.classList.contains('active')) {
    contentWrapper.style.height = contentInnerHeight + 'px'
  } else {
    contentWrapper.style.height = '0px'
  }
}



const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}



function move(parent, width, maxWidth) {
  var elem = parent.querySelector('.js-progress-range');
  var mainWidth = 0;
  maxWidth = Number(maxWidth)
  width = Number(width)
  step = Number((maxWidth / width).toFixed(5))

  var mainMaxWidth = (width * 100) / maxWidth




  var id = setInterval(frame, 10);
  function frame() {
    if (mainWidth >= mainMaxWidth) {
      clearInterval(id);
    } else {
      mainWidth += step;

      elem.style.width = mainWidth + '%';

    }
  }
}

document.querySelectorAll('.minerals-progress-item').forEach(parent => {
  const width = parent.getAttribute('data-width')
  const maxWidth = parent.getAttribute('data-max-width')
  if (width && maxWidth) {
    move(parent, width, maxWidth)
  }

})


const aboutWater = document.querySelectorAll('.js-about-head')

aboutWater.forEach(item => {
  item.onclick = (e) => {
    let curTarget = e.currentTarget
    const curTargetParent = curTarget.closest('.js-about-item')
    let flag = false
    // if (e.target.closest('.sound-btn)') !== undefined) {
    //   return
    // }
    if (e.target.classList.contains('sound-btn')) {
      flag = true
    }
    if (!flag) {
      curTargetParent.classList.toggle('active')
    }

    if (curTargetParent && curTargetParent.classList.contains('active') && !flag) {
      const wrapper = curTargetParent.querySelector('.js-bottom-content-wrap')
      const content = curTargetParent.querySelector('.js-bottom-content').getBoundingClientRect()

      wrapper.style.height = content.height + 'px'

    } else if (!flag) {
      const wrapper = curTargetParent.querySelector('.js-bottom-content-wrap')
      if (wrapper) {
        wrapper.style.height = '0px'
      }
    }
  }
})

const soundBtns = document.querySelectorAll('.sound-btn')



soundBtns.forEach(soundBtn => {
  soundBtn.onclick = (e) => {
    var isPlaying = false;
    const curTarget = e.currentTarget
    if (curTarget.querySelector('.sound-audio')) {
      // curTarget.querySelector('.sound-audio').play()
      togglePlay(curTarget.querySelector('.sound-audio'))
    }
    function togglePlay(item) {
      isPlaying ? item.pause() : item.play();
    };
    curTarget.querySelector('.sound-audio').onplaying = function () {
      isPlaying = true;
    };
    curTarget.querySelector('.sound-audio').onpause = function () {
      isPlaying = false;
    };
  }
})

const propertyItems = document.querySelectorAll('.js-modal-item')

propertyItems.forEach(item => {
  item.onclick = (e) => {

  }
})


class PropertiesModal {
  container = null
  modalWrapper = null
  works = false
  constructor(props) {
    const { container } = props
    this.container = document.querySelector(container)
    this.modalWrapper = this.container.querySelector('.js-modal-wrap')
    if (this.modalWrapper) {
      this.modalWrapper.querySelectorAll('.js-modal-close').forEach(item => item.onclick = (e) => this.closeModal(e))
      this.container.querySelectorAll('.js-modal-handleOnClick').forEach(item => item.onclick = (e) => this.openModalWrap(e))
      this.container.querySelector('.js-modal-wrap').onclick = (e) => {
        if (e.target === e.currentTarget) {
          this.closeAll()
        }
      }
      console.log('Initializing done')
      this.works = true
    }
    if (!this.works) {
      console.log('You have problem in initializing')
      return
    }

  }
  closeModal = (item) => {
    item = item.currentTarget
    item.closest('.js-modal').classList.remove('active')
    item.closest('.js-modal-wrap').classList.remove('active')
    document.body.classList.remove('modal-open')
  }
  closeAll = () => {
    this.container.querySelectorAll('.js-modal').forEach(item => {
      item.classList.remove('active')
    })
    this.container.querySelector('.js-modal-wrap').classList.remove('active')
    document.body.classList.remove('modal-open')
  }
  openModalWrap = (item) => {
    item = item.currentTarget
    // const item = item.currentTarget
    const id = item.getAttribute('data-id')
    const flag = this.openModal(this.modalWrapper, id)
    if (flag) {

      if (this.modalWrapper) {
        this.modalWrapper.classList.add('active')
        document.body.classList.add('modal-open')
      } else {
        console.log(`You haven't modal wrap`)
      }

    }
  }
  openModal = (parent, id) => {
    const child = parent.querySelector(`.js-modal[data-id="${id}"]`)
    if (child) {
      child.classList.add('active')
      console.log(`modal active id - ${id}`)
      return true
    } else {
      console.log(' modal state is unactive')
      return false
    }



  }

}

const modal1 = new PropertiesModal({ container: '.properties-wrapper' })
const modal2 = new PropertiesModal({ container: '.minerals' })
const modal3 = new PropertiesModal({ container: '.banner-properties' })

// Chart.defaults.font.size = 50

let customValue = 20
let maxValue = 100


let innerValue = [10, 20, 230, 0, 3]
let innerLabels = ['Cl', 'Ca', 'K', 'Mg', 'Na']



let maxArr = setMaximums(innerValue, maxValue, customValue)
let labelArr = setLabels(innerLabels, innerValue)
let testWatervalues = setValues(innerValue)


function setMaximums(arr, _maxValue, _customValue) {
  let innerMaxArr = []
  for (let i = 0; i < arr.length; i++) {
    innerMaxArr.push(valForm(_maxValue))

  }
  return innerMaxArr
}
function valForm(value) {
  return value + customValue
}
function setValues(arr) {
  let innerValueArr = []
  for (let i = 0; i < arr.length; i++) {
    if (valForm(arr[i]) > maxValue + customValue * 2) {
      innerValueArr.push(maxValue + customValue * 2)
    } else {
      innerValueArr.push(valForm(arr[i]))
    }

  }

  return innerValueArr
}
function setLabels(_labelArr, _valueArr) {
  let innerLabelArr = []
  for (let i = 0; i < _valueArr.length; i++) {
    const value = _valueArr[i];
    const label = _labelArr[i];
    // console.log(`${label}, ${value}%`)
    innerLabelArr.push(`${label}, ${value}%`)
  }

  return innerLabelArr
}



Chart.defaults.global.defaultFontFamily = 'Montserrat';
Chart.defaults.global.defaultFontStyle = 'Bold';
Chart.defaults.global.defaultFontColor = '#0092ED'
Chart.defaults.global.elements.point.radius = 1.5
console.log(Chart.defaults.global)


let ctx = document.querySelector('#myChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: labelArr,
    datasets: [{
      label: 'RADAR 2',
      data: testWatervalues,
      fill: true,
      backgroundColor: 'rgba(189, 0, 255, 0.35)',
      borderColor: '#9B51E0',
      // pointBackgroundColor: 'rgba(54, 162, 235, 0)',
      pointBorderColor: 'rgba(54, 162, 235, 0)',
      pointBackgroundColor: '#9B51E0',
      // pointBorderColor: '#0092ED'
    }, {
      label: '100%',
      data: maxArr,
      fill: false,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235)',
      // pointBackgroundColor: 'rgba(54, 162, 235, 0)',
      pointBorderColor: 'rgba(54, 162, 235, 0)',
      pointHoverBackgroundColor: 'rgba(54, 162, 235, 0)',
      pointHoverBorderColor: 'rgba(54, 162, 235, 0)',
      pointBackgroundColor: 'rgba(54, 162, 235)',
    }]
  },
  options: {


    scale: {

      ticks: {
        display: false,
        beginAtZero: true,
        max: 100 + customValue * 2,
        min: 0,
        stepSize: customValue,
        fontColor: 'white',
      },

      angleLines: {
        color: 'rgba(0,0,0,0)' // lines radiating from the center
      }
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false, callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    },
    hover: { mode: null },

  },
  // defaults: defaultOptions
});