# 魂の共鳴 ～私を信じて～

砂粒子物理を取り入れたブロックパズルゲーム。ブロックが着地すると砂粒子に変化し、同色の砂が横幅全体をつなぐとライン消去。連鎖でFEVERモードが発動します。

## 技術スタック

- **フロントエンド**: HTML5 Canvas (単一ファイル構成)
- **言語**: JavaScript (ES Modules, インライン)
- **バックエンド**: Firebase Firestore (グローバルランキング)
- **認証**: Firebase Anonymous Auth
- **ネイティブ**: Capacitor (iOS / Android)
- **広告**: AdMob (Capacitor plugin)
- **PWA**: Service Worker によるオフライン対応

## 機能

- 砂粒子物理シミュレーション (サブセル解像度)
- 5色ブロック + 連結成分ベースのライン消去
- HOLD / NEXT / NEXT2 のピース管理
- コンボ → FEVERモード (専用BGM + 視覚エフェクト)
- グローバルランキング (Firestore, 上位20名)
- 多言語対応 (日本語 / English)
- レベル進行によるステージ背景変化
- 画面シェイク・危険警告演出
- App Tracking Transparency (iOS)
- プライバシーマニフェスト (PrivacyInfo.xcprivacy)

## 動作環境

- **Web**: モダンブラウザ (Chrome, Safari, Firefox)
- **iOS**: Capacitor + WKWebView
- **Android**: Capacitor + WebView

## 開発

```bash
# Web版をローカルで実行
# 任意のHTTPサーバーでプロジェクトルートを配信
npx serve .

# Capacitor iOS ビルド
npx cap sync ios
npx cap open ios

# Capacitor Android ビルド
npx cap sync android
npx cap open android
```

## ライセンス

Copyright (c) 2025 NullpoWorks. All Rights Reserved.

このソフトウェアのソースコード、アセット、その他の構成物の複製、改変、再配布は許可されていません。
