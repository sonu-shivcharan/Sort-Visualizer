const arr = [];
for (let i = 0; i < 50; i++) {
  arr[i] = i+1;
}
//utility functions
const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
// intital render renders divs with different height
(function createBars() {
  const container = document.getElementById("bar-container");
  arr.forEach((num)=> {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${num*2}%`
    container.appendChild(bar);
  });
})();
const updateBarHeight = (arr, ...idx) => {
  const bars = document.getElementById("bar-container").children;
  for (let num of idx) {
    bars[num].style.height = `${arr[num]*2}%`
  }
}
const updateBarHeights = (arr) => {
  const bars = document.getElementById("bar-container").children;
  arr.forEach((num, idx)=> {
    bars[idx].style.height = `${num*2}%`
  });
}
//sorting algorithms with delay
const n = arr.length;
function bubbleSort (arr, i, j) {
  if (i > n-1) return 1;
  if (j > n-1-i) {
    j = 0;
    i++;
  }
  if (arr[j] > arr[j+1]) {
    swap(arr, j, j+1);
    updateBarHeight( arr, j, j+1);
  }
  setTimeout(()=> {bubbleSort(arr, i, j+1)}, 25);
    /*await setTimeout(bubbleSort, 25, arr, i, j+1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n-i-1; j++) {
      if (arr[j] > arr[j+1]) {
                await new Promise(resolve => setTimeout(resolve, 25))
        swap(arr, j, j+1);
        updateBarHeight(arr, j, j+1);
      }
    }
    await new Promise(resolve => setTimeout(resolve, 25))
  }*/
}
function selectionSort(arr, i) {
  if (i >= n-1) return;
  let min = i;
  for (let j = i+1; j < n; j++) {
    if (arr[min] > arr[j]) min = j;
  }
  swap(arr, min, i);
  updateBarHeight(arr, i, min);
  setTimeout(()=> {
    selectionSort(arr, i+1)}, 250)
}
function insertionSort(arr, i) {
  if (i > n-1) return;
  let j = i;
  const helper = (idx)=> {
    if (idx <= 0) {
      insertionSort(arr, i+1);
      return;
    }
    let didSwapped = false;
    if (idx > 0 && arr[idx] < arr[idx-1]) {
      swap(arr, idx, idx-1);
      updateBarHeight(arr, idx, idx-1);
      //updateBarHeight(arr, idx-1);
      didSwapped = true;
    }
    if (didSwapped) {
      setTimeout(()=> {
        helper(idx-1)}, 50);
    } else {
      helper(idx-1);
    }
  }
  helper(j);
}
async function mergeSort(arr, low, high) {
  //console.log(low, high)
  if (low >= high) return;
  const mid = parseInt((low+high)/2);
  await mergeSort(arr, low, mid)
  await mergeSort(arr, mid+1, high)
  await merge(arr, low, mid, high)
  async function merge (nums, low, mid, high) {
    let left = low;
    let right = mid+1;
    let temp = [];
    while (left <= mid && right <= high) {
      if (nums[left] <= nums[right]) {
        temp.push(nums[left]);
        left++;
      } else {
        temp.push(nums[right]);
        right++;
      }
    }
    while (left <= mid) {
      temp.push(nums[left]);
      left++;
    }
    while (right <= high) {
      temp.push(nums[right]);
      right++;
    }
    for (let i = low; i <= high; i++) {
      nums[i] = temp[i-low];
      updateBarHeight(arr, i)
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }
}
async function quickSort(arr, low, high) {
  if (low >= high) return;
  let part = await partition(arr, low, high);
  await quickSort(arr, low, part-1);
  await quickSort(arr, part+1, high);
  async function partition(arr, low, high) {
    let pivot = arr[low];
    let left = low;
    let right = high;
    while (left < right) {
      while (arr[left] <= pivot && left < high) left++;
      while (arr[right] > pivot && right > low) right--;
      if (left < right) {
        swap(arr, right, left);
        updateBarHeight(arr, right, left);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    swap(arr, low, right);
    updateBarHeight(arr, low, right);
    await new Promise(resolve => setTimeout(resolve, 100));
    return right;
  }
}

const sortBtn = document.getElementById("sort-btn");
 function sortByInterval() {
  const sortSelect = document.getElementById("sort-select");
  const sortName = sortSelect.value.toLowerCase();
  //sortBtn.removeEventListener('click', sortByInterval);
  sortBtn.onclick = null;
  //console.log(sortBtn);
  switch (sortName) {
    case "bubble":
      console.log("before running sort")
       bubbleSort(arr, 0, 0);
      console.log("after delay")
      break;
    case "selection":
      selectionSort(arr, 0);
      break;
    case "insertion":
      insertionSort(arr, 0);
      break;
    case "merge":
      mergeSort(arr, 0, n-1);
      break;
    case "quick":
      quickSort(arr, 0, n-1);
      break;
    default: bubbleSort(arr, 0, 0)
    }
  }
  function shuffleBars() {
  let randomIdx = 0;
  for (let i in arr) {
    randomIdx = Math.floor(Math.random()*arr.length);
    swap(arr, i, randomIdx);
  }
  updateBarHeights(arr);
  sortBtn.onclick = sortByInterval;
}

  document.getElementById("shuffle-btn").addEventListener("click", shuffleBars)
  // sortBtn.addEventListener("click",sortByInterval);
  sortBtn.onclick = sortByInterval;