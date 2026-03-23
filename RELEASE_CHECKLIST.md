# 正式リリース チェックリスト

> このファイルは「魂の共鳴」を正式リリース版として仕上げるための全タスクを管理します。
> 各タスクは優先度順に並べてあり、完了したら `[x]` に変更してください。
> コンテキスト制限があるため、1セッションで全てを対処する必要はありません。
> 少しずつ進めていきましょう。

---

## フェーズ1: クリティカルバグ修正 (HIGH)

### 1.1 タッチ/クリック座標スケーリング修正
- [x] `touchend` ハンドラの座標を canvas 論理ピクセルにスケーリング ✅ v3.728
- [x] `click` ハンドラも同様に修正 ✅ v3.728

### 1.2 `canMove()` の `newY < 0` チェック追加
- [x] `canMove()`: `newY < 0` のセルをスキップ（テトリス方式） ✅ v3.728
- [x] ゴーストピース計算にも同様のガードを追加 ✅ v3.728

### 1.3 `isFullWidth()` ロジック修正
- [x] スパンチェック → 全カラム存在チェック（Uint8Array）に変更 ✅ v3.728

---

## フェーズ2: 中優先度バグ修正 (MEDIUM)

### 2.1 `gameOver()` 再入ガード追加
- [x] `gameOverInProgress` フラグで async 処理中の再入を防止 ✅ v3.729
- [x] `resetGame()` でフラグをリセット ✅ v3.729

### 2.2 `rankPosition` 計算の確認
- [x] 降順リストでの `<=` 検索は標準的なリーダーボード方式 — 問題なし ✅ 確認済

### 2.3 未クリアの `setTimeout` ハンドル
- [x] `gameOverTimers[]` 配列で全 setTimeout を管理 ✅ v3.729
- [x] `resetGame()` で全タイマーをクリア ✅ v3.729
- [x] `playGameOverBGMDelayed()` のタイマーも管理対象に追加 ✅ v3.729

### 2.4 マルチタッチ時の `isTouchHolding` リセット
- [x] 2本指タッチ開始時に `isTouchHolding` と `softDropTimer` をリセット ✅ v3.729

---

## フェーズ3: PWA / オフライン対応

### 3.1 Service Worker キャッシュ漏れ修正
- [x] `logo-white.png` — 既にキャッシュリストに含まれていた ✅ 確認済
- [x] `game-title.png` — 既にキャッシュリストに含まれていた ✅ 確認済

### 3.2 `cache.addAll()` の耐障害性向上（検討）
- [x] 全アセットがリポジトリに含まれており404リスクは極めて低い — 現状維持 ✅ 確認済

### 3.3 manifest.json の強化（任意）
- [x] `screenshots` フィールド — PWA削除予定のため対応不要 ✅
- [x] `related_applications` — PWA削除予定のため対応不要 ✅

---

## フェーズ4: パフォーマンス最適化

### 4.1 `drawBlock3D()` のグラデーション最適化
- [x] sizeごとのRadialGradientキャッシュ（Map）+ ctx.translateで位置オフセット ✅ v3.767
- **影響**: フレームあたり数百のグラデーション生成 → 1回のみ生成

### 4.2 `simulateSand()` の Set 再構築最適化（検討）
- [x] O(n)のSet構築は4000パーティクルで十分高速。インクリメンタル更新は7箇所の変更が必要でリスク大 — 現状維持 ✅ 確認済

### 4.3 `findConnectedComponents()` の最適化（検討）
- [x] DFS+数値キー方式で既に効率的に実装済み — 現状維持 ✅ 確認済

### 4.4 Feverモードのグラデーション最適化
- [x] オーバーレイ: ゲームエリアサイズごとにキャッシュ+globalAlphaで脈動 ✅ v3.767
- [x] パーティクル8個: RadialGradient → arc()+単色fillに簡略化 ✅ v3.767

### 4.5 `updateScoreDisplay()` innerHTML → textContent
- [x] HTML構造上 innerHTML が必要（`<span>` / `<br>` タグ使用）。値は全て数値でXSSリスクなし — 現状維持 ✅ 確認済

### 4.6 `resize` ハンドラのデバウンス追加
- [x] 50msデバウンスを追加、リドロー処理をデバウンス内に移動 ✅ v3.730

---

## フェーズ5: コード品質 / デッドコード除去

### 5.1 デッドコード除去
- [x] `pieceType` 変数と二重 `findIndex` を削除 ✅ v3.730
- [x] `overflowDetected` 変数を完全削除（宣言、resetGame、全消去の3箇所） ✅ v3.730
- [x] `NEXT_PIECE_LABEL` 定数を削除（未使用） ✅ v3.730
- [x] `NEXT_PIECE_PADDING` — 1箇所で使用中のため保持 ✅ 確認済

### 5.2 未使用アセット確認
- [x] `logo.png` — コード未参照、Service Worker未キャッシュ → 削除済み ✅ v3.767

### 5.3 `buildStageBgCache()` のキャンバス再利用
- [x] モジュールスコープで単一オフスクリーンcanvasを保持し再利用 ✅ v3.767
- **効果**: Android WebViewでのGPUメモリリーク防止

### 5.4 `welcomeAnimFrame` のクリーンアップ
- [x] `resetGame()` で `cancelAnimationFrame(welcomeAnimFrame)` を追加 ✅ v3.730

---

## フェーズ6: セキュリティ / 審査対策

### 6.1 CSP ポリシー確認
- [x] `unsafe-inline` — 全JSがインラインscriptのため必須 ✅ 確認済
- [x] `unsafe-eval` — Firebase SDK (dynamic import) 依存のため必須 ✅ 確認済
- [x] `connect-src` — Firebase/AdMob ドメインに正しく限定 ✅ 確認済

### 6.2 innerHTML の使用箇所確認
- [x] スコア表示（数値のみ）、コンボ表示（数値のみ）— XSSリスクなし ✅ 確認済
- [x] HTML構造上 `<span>`/`<br>` タグが必要なため innerHTML を維持 ✅ 確認済

### 6.3 プレイヤー名サニタイゼーション
- [x] NGワードフィルタ実装済み（~L829-875）
- [x] 長さ制限（10文字）実装済み
- [x] コントロール文字除去実装済み

### 6.4 スコアバリデーション
- [x] クライアント側バリデーション実装済み ✅ 確認済
- [x] Firestore Security Rules のサーバー側バリデーション確認済み ✅ 確認済

---

## フェーズ7: プラットフォーム固有

### 7.1 Android AdMob ユニットID
- [x] インタースティシャル: `ca-app-pub-4148293353679224/9166455565` を設定 ✅ v3.767
- [x] リワード広告ユニットID（Android）: `ca-app-pub-4148293353679224/3728355654` を設定 ✅ v3.768
- [x] リワード広告ユニットID（iOS）: `ca-app-pub-4148293353679224/7033876544` を設定 ✅ v3.771
- [x] インタースティシャル広告ユニットID（iOS）: `ca-app-pub-4148293353679224/8654346870` を設定 ✅ v3.771

### 7.2 Apple Privacy Manifest
- [x] `PrivacyInfo.xcprivacy` 適切に設定済み
- [x] トラッキングドメイン宣言済み
- [x] Required Reason API 宣言済み

---

## フェーズ8: ドキュメント / メタデータ

### 8.1 README.md の充実
- [x] アプリ説明、技術スタック、機能一覧、動作環境、開発手順を追記 ✅
- [x] スクリーンショットの追加 — ストア審査に不要、対応不要 ✅

### 8.2 ライセンス情報
- [x] LICENSE ファイルを追加 (All Rights Reserved - NullpoWorks) ✅

---

## 進捗サマリー

| フェーズ | 項目数 | 完了 | 状態 |
|---------|--------|------|------|
| 1. クリティカルバグ | 3 | 3 | ✅ 完了 |
| 2. 中優先度バグ | 4 | 4 | ✅ 完了 |
| 3. PWA対応 | 3 | 3 | ✅ 完了 |
| 4. パフォーマンス | 6 | 6 | ✅ 完了 |
| 5. コード品質 | 4 | 4 | ✅ 完了 |
| 6. セキュリティ | 4 | 4 | ✅ 完了 |
| 7. プラットフォーム | 2 | 2 | ✅ 完了 |
| 8. ドキュメント | 2 | 2 | ✅ 完了 |
