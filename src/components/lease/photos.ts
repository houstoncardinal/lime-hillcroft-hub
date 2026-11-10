// Photos for lease-to-own devices that have no /devices page photo. Picked from Wikimedia
// Commons for the exact model (checked by eye), cropped to that device where the original shows
// several, and credited on the device's lease page. Files: public/photos/devices/product/<id>.*
import type { ProductPhoto } from "@/components/products/devices";

const p = (
  id: string,
  w: number,
  h: number,
  en: string,
  es: string,
  author: string,
  license: string,
  href: string,
): ProductPhoto => ({
  src: `/photos/devices/product/${id}.webp`,
  jpg: `/photos/devices/product/${id}.jpg`,
  w,
  h,
  alt: { en, es },
  credit: { author, license, href },
});

export const LEASE_PHOTOS: Record<string, ProductPhoto> = {
  "iphone-air": p("iphone-air", 800, 1200, "iPhone Air in Space Black", "iPhone Air color Negro espacial", "Ahmad Ali Karim", "CC0", "https://commons.wikimedia.org/wiki/File:Space_Black_iPhone_Air.jpg"),
  "iphone-15-pro": p("iphone-15-pro", 435, 1200, "iPhone 15 Pro in Natural Titanium", "iPhone 15 Pro color Titanio natural", "IPHONE 15", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Apple_iPhone_15_Pro.jpg"),
  "iphone-xs-max": p("iphone-xs-max", 1200, 782, "iPhone XS Max in Gold", "iPhone XS Max color Oro", "GillyBerlin", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:IPhone_XS_Max_gold_%26_Cappuccino_20180921.jpg"),
  "iphone-xr": p("iphone-xr", 900, 1200, "iPhone XR in Blue", "iPhone XR color Azul", "Asdaiang14453", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPhone_XR.jpg"),
  "iphone-se-2": p("iphone-se-2", 900, 1200, "iPhone SE (2nd generation) in (PRODUCT)RED", "iPhone SE (2.ª generación) color (PRODUCT)RED", "Seth Whales", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPhone_SE_(2020)_Product_Red.jpg"),
  "iphone-8": p("iphone-8", 1200, 800, "iPhone 8 in Silver", "iPhone 8 color Plata", "Tinh tế Photo", "CC0", "https://commons.wikimedia.org/wiki/File:IPhone_8_silver_with_white_rear.jpg"),
  "iphone-8-plus": p("iphone-8-plus", 900, 1200, "iPhone 8 Plus in Silver", "iPhone 8 Plus color Plata", "茅野ふたば", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPhone_8_Plus_silver.jpg"),
  "galaxy-z-fold5": p("galaxy-z-fold5", 1200, 1200, "Galaxy Z Fold5, unfolded", "Galaxy Z Fold5 desplegado", "Vasonesiku", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Samsung_Galaxy_Fold_5.jpg"),
  "galaxy-z-flip4": p("galaxy-z-flip4", 900, 1200, "Galaxy Z Flip4, folded with the cover screen on", "Galaxy Z Flip4 cerrado con la pantalla exterior encendida", "Hajoon0102", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Samsung_Galaxy_Z_Flip_4.jpg"),
  "galaxy-s20-plus": p("galaxy-s20-plus", 900, 1200, "Galaxy S20+ 5G in Cloud Blue, back", "Galaxy S20+ 5G color Cloud Blue, parte trasera", "Kskhh", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Back_of_a_Samsung_Galaxy_S20_Plus_5G.jpg"),
  "galaxy-note10-plus": p("galaxy-note10-plus", 544, 1200, "Galaxy Note10+ in Aura Glow, back", "Galaxy Note10+ color Aura Glow, parte trasera", "Samsung Galaxy Note 10", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Back_of_Galaxy_Note_10,_Galaxy_Note_10%2B_and_Galaxy_Note_10_Lite_20200220b.jpg"),
  "galaxy-s9-plus": p("galaxy-s9-plus", 1200, 675, "Galaxy S9+", "Galaxy S9+", "Skorp24", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Samsung_Galaxy_S9%2B_and_Wikipedia,_side_view.jpg"),
  "galaxy-a54": p("galaxy-a54", 900, 1200, "Galaxy A54 5G in Awesome White, back", "Galaxy A54 5G color Awesome White, parte trasera", "Hajoon0102", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Back_of_the_Samsung_Galaxy_A54_5G.jpg"),
  "apple-watch-series-11": p("apple-watch-series-11", 1200, 794, "Two Apple Watch Series 11", "Dos Apple Watch Series 11", "极客湾Geekerwan", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:Two_Apple_Watch_Series_11_(cropped).png"),
  "apple-watch-series-12": p("apple-watch-series-12", 566, 1200, "Apple Watch Series 12", "Apple Watch Series 12", "Piperpet", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:AppleWatchSeries12.jpg"),
  "apple-watch-se": p("apple-watch-se", 900, 1200, "Apple Watch SE (2nd generation)", "Apple Watch SE (2.ª generación)", "茅野ふたば", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Watch_SE_(2nd_generation).jpg"),
  "ipad-mini-6": p("ipad-mini-6", 900, 1200, "iPad mini (6th generation)", "iPad mini (6.ª generación)", "Theknine2", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPad_Mini_6_in_hand.jpg"),
  "ipad-9": p("ipad-9", 1200, 898, "iPad (9th generation) with Smart Keyboard", "iPad (9.ª generación) con Smart Keyboard", "Captainmorlypogi1959", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPad_9th_Generation_2024.jpg"),
  "ipad-8": p("ipad-8", 836, 1200, "10.2-inch iPad, the design of the 8th generation", "iPad de 10.2 pulgadas, el diseño de la 8.ª generación", "Piscopro", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPad_10.2%E2%80%91inch.png"),
  "ipad-6": p("ipad-6", 843, 1198, "9.7-inch iPad, the design of the 6th generation", "iPad de 9.7 pulgadas, el diseño de la 6.ª generación", "Jem Riggs", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:IPad_9.7-inch.png"),
  "macbook-air-13-m4": p("macbook-air-13-m4", 1200, 900, "MacBook Air 13-inch (M4) in Silver", "MacBook Air de 13 pulgadas (M4) color Plata", "AzureSaturn", "CC0", "https://commons.wikimedia.org/wiki/File:MacBook_Air_(13-inch,_M4,_Silver).jpg"),
  "macbook-air-15-m5": p("macbook-air-15-m5", 1200, 900, "MacBook Air 15-inch in Silver", "MacBook Air de 15 pulgadas color Plata", "AzureSaturn", "CC0", "https://commons.wikimedia.org/wiki/File:MacBook_Air_(15-inch,_M4,_Silver).jpg"),
  "macbook-air-13-m5": p("macbook-air-13-m5", 1200, 1200, "MacBook Air 13-inch (M5) in Sky Blue", "MacBook Air de 13 pulgadas (M5) color Azul cielo", "Kyu3a", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:M5_Macbook_Air_13_Sky_Blue_model.jpg"),
  "macbook-neo-13": p("macbook-neo-13", 1142, 1200, "MacBook Neo 13-inch", "MacBook Neo de 13 pulgadas", "EvanTech10", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:MacBook_Neo_Indigo_Touch_ID.png"),
  "playstation-5-pro": p("playstation-5-pro", 853, 1200, "PlayStation 5 Pro", "PlayStation 5 Pro", "BeatEmUps", "CC BY 3.0", "https://commons.wikimedia.org/wiki/File:PlayStation_5_Pro_no_disc_drive.jpg"),
  "playstation-5": p("playstation-5", 997, 1200, "PlayStation 5 with DualSense controller", "PlayStation 5 con control DualSense", "Osh33m", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:PlayStation_5_and_DualSense.jpg"),
  "xbox-series-x": p("xbox-series-x", 1023, 1200, "Xbox Series X with controller", "Xbox Series X con control", "Der. Bellemer", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Xbox_Series_X_2.jpg"),
  "nintendo-switch-2": p("nintendo-switch-2", 1200, 643, "Nintendo Switch 2 in its dock", "Nintendo Switch 2 en su base", "Crisco 1492", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_2_in_Docking_Console.jpg"),
  "playstation-portal": p("playstation-portal", 1200, 397, "PlayStation Portal remote player", "Reproductor remoto PlayStation Portal", "ArlindoPereira", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:PlayStation_Portal.jpg"),
  "samsung-tv-65": p("samsung-tv-65", 1200, 675, "Samsung QLED TV", "Televisor Samsung QLED", "Bretwa", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Samsung_QLED_TV_8K_-_75_inches_-_2018-11-02.jpg"),
};
