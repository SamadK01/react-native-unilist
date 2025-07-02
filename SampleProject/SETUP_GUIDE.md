# UniList Library Test Karne Ka Tarika

## 🚀 Quick Setup (5 Minutes)

### Step 1: New Project Banana
```bash
# New folder banayein
mkdir MyUniListTest
cd MyUniListTest

# Expo project initialize karein
npx create-expo-app@latest . --template blank-typescript
```

### Step 2: UniList Library Install Karein
```bash
# Local library install (agar aapke paas source code hai)
npm install ../path/to/your/unilist/library

# Ya GitHub se direct install
npm install https://github.com/SamadK01/react-native-unilist.git
```

### Step 3: App.tsx Replace Karein
Maine jo `App.tsx` file banayi hai, use apne project mein copy karein.

### Step 4: App Chalayein
```bash
npm start
```

## 📱 App Features

### 🎨 UI Controls
- **🌙/☀️ Button**: Light/Dark theme switch
- **🔍 Button**: Search bar toggle
- **📱/📐/🎠/🧱 Buttons**: Different view modes
- **Color Buttons**: Different color schemes

### 🛍️ Sample Data
- **100 Products** with realistic data
- **Prices, Ratings, Stock Status**
- **Discounts and Buy Buttons**

### 🔍 Search Features
- **Real-time Search** by product name, category
- **Debounced Search** (500ms delay)
- **Clear Search** functionality

### 📄 Pagination
- **Load More** on scroll
- **Loading Indicators**
- **Pull to Refresh**

## 🎯 Test Karne Ke Liye

### 1. Basic Cards
- App open karein
- Different card types dekhein (Elevated, Outlined, Gradient, Glass)

### 2. Layouts Test Karein
- **📱 List View**: Normal list
- **📐 Grid View**: 2-column grid
- **🎠 Carousel**: Auto-playing slides
- **🧱 Masonry**: Pinterest-style layout

### 3. Theme System
- **🌙/☀️ Button** press karein
- **Color buttons** press karein (Blue, Green, Purple, Orange, Red)

### 4. Search Test
- **🔍 Button** press karein
- **Search bar** mein kuch type karein
- **Results** dekhein

### 5. Pagination Test
- **Scroll down** karein
- **Loading indicator** dekhein
- **More items** load hote dekhein

## 🐛 Agar Koi Problem Hai

### Error: Module not found
```bash
# Dependencies reinstall karein
rm -rf node_modules
npm install
```

### Error: Metro bundler issue
```bash
# Metro cache clear karein
npx expo start --clear
```

### Error: TypeScript errors
```bash
# TypeScript types install karein
npm install @types/react @types/react-native
```

## 📞 Help

Agar koi problem hai to:
1. **Console errors** check karein
2. **Metro bundler logs** dekhein
3. **Dependencies** verify karein

## 🎉 Success!

Agar sab kuch sahi chal raha hai to aapki UniList library successfully work kar rahi hai! 🚀 