import aldehydeC18 from '../../assets/images/Flavors/Aldehyde C18.jpg';
import amber from '../../assets/images/Flavors/amber.jpg';
import aqua from '../../assets/images/Flavors/aqua.jpg';
import bergamot from '../../assets/images/Flavors/bergamot.jpg';
import blackcherry from '../../assets/images/Flavors/blackcherry.jpg';
import blackcurrent from '../../assets/images/Flavors/blackcurrent.jpg';
import blackpepper from '../../assets/images/Flavors/blackpepper.jpg';
import cedarwood from '../../assets/images/Flavors/cedarwood.jpg';
import fig from '../../assets/images/Flavors/fig.jpg';
import Frankincense from '../../assets/images/Flavors/Frankincense.jpg';
import freesia from '../../assets/images/Flavors/freesia.jpg';
import grapefruit from '../../assets/images/Flavors/grapefruit.jpg';
import green from '../../assets/images/Flavors/green.jpg';
import hinoki from '../../assets/images/Flavors/hinoki.jpg';
import leather from '../../assets/images/Flavors/leather.jpg';
import lemon from '../../assets/images/Flavors/lemon.jpg';
import lilyofthevalley from '../../assets/images/Flavors/lily of the valley.jpg';
import magnolia from '../../assets/images/Flavors/magnolia.jpg';
import marineblue from '../../assets/images/Flavors/marine blue.jpg';
import mint from '../../assets/images/Flavors/mint.jpg';
import muguet from '../../assets/images/Flavors/muguet.jpg';
import ocean from '../../assets/images/Flavors/ocean.jpg';
import patchouli from '../../assets/images/Flavors/Patchouli.jpg';
import peach from '../../assets/images/Flavors/peach.jpg';
import rose from '../../assets/images/Flavors/rose.jpg';
import rosemary from '../../assets/images/Flavors/rosemary.jpg';
import sandalwood from '../../assets/images/Flavors/Sandalwood.jpg';
import thyme from '../../assets/images/Flavors/thyme.jpg';
import vanilla from '../../assets/images/Flavors/vanilla.jpg';
import whitemusk from '../../assets/images/Flavors/whitemusk.jpg';

// 한글 -> 영어 매핑 데이터
export const labelToEnglishMap = {
  "알데하이드 C18": "BASE_ALDEHYDE",
  "엠버": "BASE_AMBER",
  "아쿠아": "TOP_AQUA",
  "베르가못": "TOP_BERGAMOT",
  "블랙 체리": "TOP_BLACKCHERRY",
  "블랙 커런트": "MIDDLE_BLACKCURRANT",
  "블랙페퍼": "MIDDLE_PEPPER",
  "시더우드": "BASE_CEDAR",
  "무화과": "TOP_FIG",
  "프랑킨센스": "BASE_FRANKINCENSE",
  "프리지아": "MIDDLE_FREESIA",
  "자몽": "TOP_GRAPEFRUIT",
  "그린": "TOP_GREEN",
  "히노키": "BASE_HINOKI",
  "레더": "BASE_LEATHER",
  "레몬": "TOP_LEMON",
  "릴리 오브 더 밸리": "MIDDLE_LILYOFTHEVALLEY",
  "매그놀리아": "MIDDLE_MAGNOLIA",
  "마린 블루": "BASE_BLUEMARIN",
  "민트": "TOP_MINT",
  "뮤게": "MIDDLE_MUGUET",
  "오션": "MIDDLE_OCEAN",
  "패츌리": "BASE_PATCHOULI",
  "피치": "TOP_PEACH",
  "로즈": "MIDDLE_ROSE",
  "로즈마리": "MIDDLE_ROSEMARY",
  "샌달우드": "BASE_SANDALWOOD",
  "타임": "TOP_THYME",
  "바닐라": "BASE_VANILLA",
  "화이트 머스크": "BASE_MUSK"
};

// 영어 -> 한글 매핑
export const englishToLabelMap = Object.entries(labelToEnglishMap).reduce((acc, [label, english]) => {
  acc[english] = label;
  return acc;
}, {});

export const getScentKrName = (enName) => {
  const scent = images.find((image) => image.en_name === enName);
  return scent ?  scent.kr_name : null;
};

export const images = [
  { src: aldehydeC18, kr_name: "알데하이드 C18", en_name: "BASE_ALDEHYDE",tooltip: "달달한 냄새와 세정제(비누, 샴푸, 섬유유연제) 같이 우아하고 리치한 향기" },
  { src: amber, kr_name: "엠버", en_name: "BASE_AMBER",tooltip: "은은하게 파우더리한 나무향과 달콤함이 느껴지는 부드럽고 따뜻한 발사믹 향기" },
  { src: aqua, kr_name: "아쿠아", en_name: "TOP_AQUA", tooltip: "호숫가 주변을 거니는 듯 촉촉하고 투명감 있는 시원한 자연의 향기" },
  { src: bergamot, kr_name: "베르가못", en_name: "TOP_BERGAMOT", tooltip: "약간의 허벌함과 스파이시함이 가미된 새콤달콤한 감귤계의 향기"},
  { src: blackcherry, kr_name: "블랙 체리", en_name: "TOP_BLACKCHERRY", tooltip: "새콤달콤한 체리 과즙향이 느껴지는 쥬시한 향기"},
  { src: blackcurrent, kr_name: "블랙 커런트" , en_name: "MIDDLE_BLACKCURRANT", tooltip: "은은한 달달함 속에 톡 튀는 상큼함이 돋보이며 약간의 플로럴함도 느껴지는 향기" },
  { src: blackpepper, kr_name: "블랙페퍼", en_name: "MIDDLE_PEPPER", tooltip: "톡 쏘면서 약간의 알싸하고 따뜻한 나무 향기" },
  { src: cedarwood, kr_name: "시더우드", en_name: "BASE_CEDAR", tooltip: "스모키한 느낌과 톱밥, 연필이 연상되는 마른 나무 향기" },
  { src: fig, kr_name: "무화과", en_name: "TOP_FIG", tooltip: "열대 과일의 달달함에 그린스러움이 가미된 은은하게 달콤씁쓸한 향취" },
  { src: Frankincense, kr_name: "프랑킨센스", en_name: "BASE_FRANKINCENSE", tooltip: "코를 자극하는 스파이시함에 약간의 달콤함과 은은한 우디향이 조화로운 향기" },
  { src: freesia, kr_name: "프리지아", en_name: "MIDDLE_FREESIA", tooltip: "봄의 화원을 거니는 듯 화사하고 풍성하며 싱그러운 플로럴 향기" },
  { src: grapefruit, kr_name: "자몽", en_name: "TOP_GRAPEFRUIT", tooltip: "약간 쓴 것 같지만 달콤함과 상큼함이 느껴지는 밝고 상쾌한 감귤계의 대표 항기" },
  { src: green, kr_name: "그린", en_name: "TOP_GREEN", tooltip: "풀밭에 누워있는 듯한 약간의 허베이셔한 느낌도 나는 풀잎 향기" },
  { src: hinoki, kr_name: "히노키", en_name: "BASE_HINOKI", tooltip: "은은한 솔잎의 향과 허브향이 어우러진 가볍고 프레쉬한 느낌의 향기" },
  { src: leather, kr_name: "레더", en_name: "BASE_LEATHER", tooltip: "진하고 묵직하지만 푸근하고 약간의 스모키함과 달콤함이 느껴지는 향기" },
  { src: lemon, kr_name: "레몬", en_name: "TOP_LEMON", tooltip: "약간의 달콤함과 시트러스 계열 중 가장 상큼함이 돋보이는 향기" },
  { src: lilyofthevalley, kr_name: "릴리 오브 더 밸리", en_name: "MIDDLE_LILYOFTHEVALLEY", tooltip: "달콤하고 상큼한 꽃 향기가 가볍지만 맑고 화사하게 느껴지는 향기" },
  { src: magnolia, kr_name: "매그놀리아", en_name: "MIDDLE_MAGNOLIA", tooltip: "은은한 꽃 향기와 달콤함이 어우러진 향기" },
  { src: marineblue, kr_name: "마린 블루", en_name: "BASE_BLUEMARIN", tooltip: "바다나 해안에서 느껴지는 촉촉하고 투명감 있고 해초나 오존을 연상케하는 자연의 향기" },
  { src: mint, kr_name: "민트", en_name: "TOP_MINT", tooltip: "특유의 상쾌하고 톡쏘는 시원함과 청량감이 느껴지는 향기" },
  { src: muguet, kr_name: "뮤게", en_name: "MIDDLE_MUGUET", tooltip: "맑고 청초한 느낌과 은은하게 달콤한 꽃 향기가 조화를 이루는 플로럴 향기" },
  { src: ocean, kr_name: "오션", en_name: "MIDDLE_OCEAN", tooltip: "바다 내음이 물씬 풍기는 촉촉하고 투명감 있는 시원한 바다의 향기" },
  { src: patchouli, kr_name: "패츌리", en_name: "BASE_PATCHOULI", tooltip: "쿰쿰하면서도 달달한 흙냄새와 나무껍질 냄새가 섞인 얼시하고 발사믹한 향기" },
  { src: peach, kr_name: "피치", en_name: "TOP_PEACH", tooltip: "새콤달콤 과즙 향과 은은하게 느껴지는 플로럴 향이 조화를 이룬 쥬시한 향기" },
  { src: rose, kr_name: "로즈", en_name: "MIDDLE_ROSE", tooltip: "강렬하면서 감미로운 깔끔한 장미 향기" },
  { src: rosemary, kr_name: "로즈마리", en_name: "MIDDLE_ROSEMARY", tooltip: "상쾌하고 톡쏘는 시원함과 솔잎 향이 가미된 허베이셔스한 향기" },
  { src: sandalwood, kr_name: "샌달우드", en_name: "BASE_SANDALWOOD", tooltip: "은은한 톱밥 향에 달콤하고 부드러운 우디 향기" },
  { src: thyme, kr_name: "타임", en_name: "TOP_THYME", tooltip: "쿰쿰하면서도 특유의 상쾌함과 시원함이 느껴지는 허베이셔스한 향기" },
  { src: vanilla, kr_name: "바닐라", en_name: "BASE_VANILLA", tooltip: "부드럽고 달콤하며 묵직하고 풍성한 향기" },
  { src: whitemusk, kr_name: "화이트 머스크", en_name: "BASE_MUSK", tooltip: "파우더리하며 부드럽고 달달한 향기" }
];


