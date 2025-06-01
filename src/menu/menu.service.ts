import { Injectable } from '@nestjs/common';

export const menu = [
  {
    id: 1,
    name: 'Шаурма с курицей',
    description:
      'Лаваш, курица, огурец, помидор, лук, картофель фри, морковь по-корейски',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/10253960/2a00000191dc36a75269b9123e7a556128a8/orig',
    price: 195,
    category: 'Шаурма',
  },
  {
    id: 2,
    name: 'Мега Шаурма',
    description:
      'Приготовленная на гриле, курица приобретает золотистую корочку',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/3911103/2a00000191dc42db0b7beb552410f5ea6ad7/orig',
    price: 375,
    category: 'Шаурма',
  },
  {
    id: 3,
    name: 'Гиро с курицей',
    description:
      'Гиро с курицей — это неповторимое гастрономическое произведение,которое погружает в атмосферу традиционного арабского блюда.',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/1521147/2a00000191dc54204fcba1a76cff4a9339cd/orig',
    price: 225,
    category: 'Шаурма',
  },
  {
    id: 4,
    name: 'Таше с курицей',
    description:
      'В мире фастфуда таше с курицей занимает особое место. Это блюдо, которое создается из курицы, которая приобретает золотистую корочку, зажаренную на гриле.',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/2413620/2a00000191dc5fb80618bfd729cbc7b3e4ca/orig',
    price: 229,
    category: 'Шаурма',
  },
  {
    id: 5,
    name: 'Бургер Барбекю',
    description:
      'Булка, классический соус, котлета говяжья, руккола, соус барбекю,....',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/3911103/2a00000191e5e679ad9e1512717f9bec6464/orig',
    price: 199,
    category: 'Бургеры',
  },
  {
    id: 6,
    name: 'Классический бургер',
    description:
      'Булка, котлета говяжья, лук красный, сыр чеддер, томаты, салат, соус песто,...',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/13672565/2a00000191e5ea9400c534d4276d4951f5aa/orig',
    price: 190,
    category: 'Бургеры',
  },
  {
    id: 7,
    name: 'Двойной Бургер',
    description:
      'Булка, двойная котлета говяжья, лук красный, сыр чеддер, томаты, салат,соус бургер,маринованные огурцы,картофель фри',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/2781182/2a00000191e5f335abb0bec959b9a2fbfaff/orig',
    price: 390,
    category: 'Бургеры',
  },
  {
    id: 8,
    name: 'Сосиска в лаваше',
    description:
      'Лаваш, сосиска, морковь по-корейски, сыр, ветчина, помидор, зелень',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/3911103/2a00000191e6a559d48a3531821f6af7739c/orig',
    price: 159,
    category: 'Шаурма',
  },
  {
    id: 9,
    name: 'Твистер',
    description: 'Тортилья, куриные стрипсы, свежие овощи, фирменные соусы',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/1521147/2a00000191e6a744301b2b49087ad68da987/orig',
    price: 159,
    category: 'Шаурма',
  },
  {
    id: 10,
    name: 'Пицца с ветчиной и грибами 30 и 35 см',
    description:
      'Ветчина, томаты, маслины, соус томатный, моцарелла, базилик сушеный 30 см - 225 рублей, 35 см - 410 рублей.Без грибов 390/210 рублей',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/2733259/2a00000191f135fa73fbbbbb87f1d11dd653/orig',
    price: 225,
    category: 'Пицца',
  },
  {
    id: 11,
    name: 'Пицца Жульен 30-35 см',
    description: 'Сливочный соус, курица, шампиньоны, моцарелла 399/259 рублей',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/1356083/2a00000191f13bb3d2a71249e05fb67891f9/orig',
    price: 259,
    category: 'Пицца',
  },
  {
    id: 12,
    name: 'Пицца Маргарита 30-35 см',
    description:
      'Сливочный соус, томаты, моцарелла 30 см - 258р, 35 см - 399р.',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/8331772/2a00000191f13e62b38bf29c1dee007d2494/orig',
    price: 258,
    category: 'Пицца',
  },
  {
    id: 13,
    name: 'Пицца с курицей 30 и 35 см',
    description:
      'Томаты, сливочный соус, филе цыпленка, моцарелла, базилик сушеный',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/1644120/2a0000019209f7c002f5b2a56b98e97bb0e4/orig',
    price: 275,
    category: 'Пицца',
  },
  {
    id: 14,
    name: 'Пицца с курицей и грибами 30 и 35 см',
    description:
      'Сырный соус, филе цыпленка, шампиньоны, моцарелла, сладкий перец 30 см - 289 / 35 см - 480 р',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/2808945/2a0000019209fa6d2d95689adcd07b5b3beb/orig',
    price: 289,
    category: 'Пицца',
  },
  {
    id: 15,
    name: 'Пицца Норвегия 30 и 35 см',
    description:
      'Сливочный соус, лимон, моцарелла, семга 30 см - 320р / 35 см - 600 р',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/2790747/2a0000019209fd649e4407bf3961559f7c52/orig',
    price: 320,
    category: 'Пицца',
  },
  {
    id: 16,
    name: 'Пицца Риальто 30 и 35 см',
    description:
      'Крамболь, салями, ветчина, томаты, сливочный соус, маслины...',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/2893106/2a0000019209ff84b1648c26bd00357bc180/orig',
    price: 255,
    category: 'Пицца',
  },
  {
    id: 17,
    name: 'Пицца Цезарь 30 и 35 см',
    description:
      'Соус цезарь, филе цыпленка, салат, пармезан, моцарелла, томаты, суха...',
    image:
      'https://avatars.mds.yandex.net/get-sprav-products/1424222/2a000001920a0622ab76d6fe95829d4bc09a/orig',
    price: 270,
    category: 'Пицца',
  },
];

@Injectable()
export class MenuService {
  constructor() {}

  async getMenu() {
    return menu;
  }
}
