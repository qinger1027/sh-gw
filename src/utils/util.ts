import { ElLoading } from "element-plus";

/**
 * 
 * @param dates 
 * @returns 
 */
export function formattedDates(dates:any) {
  return dates && dates.map((dateString:any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
}

/**
 * @desc 将数字转换为带有千位分隔符的格式
 */
export const numberWithCommas = (num:any) => {
  return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// 加载中展示
export const loadingShow = () =>{
  return ElLoading.service({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.7)',
  })
}

// 加载中隐藏
export const loadingHide = () =>{
  return loadingShow().close()
}

export const handleGetLabel = async (arr:any,value: any) => {
  let result = arr.find((item:any) => item.value === value);
  console.log(result ? result.label : 'ALL');
  return result ? result.label : 'ALL';
}