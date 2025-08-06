<script>
    // $props() はSvelte 5の新しい機能です。
    // 従来のSvelteをお使いの場合は export let data; を使用してください。
    let { data } = $props();

    // カテゴリごとにチャレンジをグループ化するためのオブジェクト
    const challengesByCategory = {};

    // データをループしてカテゴリ別に分類
    data.challenges.forEach(challenge => {
        // もしカテゴリがまだオブジェクトに存在しなければ、空の配列で初期化
        if (!challengesByCategory[challenge.category]) {
            challengesByCategory[challenge.category] = [];
        }
        // 対応するカテゴリにチャレンジを追加
        challengesByCategory[challenge.category].push(challenge);
    });
</script>

<div class="challenge-container">
    <h1>Challenges</h1>

    <!-- Object.entries() を使ってカテゴリ名とチャレンジの配列をループ処理 -->
    {#each Object.entries(challengesByCategory) as [category, challenges]}
        <div class="category-section">
            <h2 class="category-title">{category}</h2>
            <div class="challenge-grid">
                <!-- 各カテゴリ内のチャレンジをループ処理 -->
                {#each challenges as challenge}
                    <!-- 
                        チャレンジが解決済み(is_solved)かどうかに基づいて 'solved' クラスを動的に適用
                        これにより、解決済みの問題のスタイルを変更できます
                    -->
                    <a href="/challenge/{challenge.id}" class="challenge-block" class:solved={challenge.is_solved}>
                        <span class="challenge-title">{challenge.title}</span>
                        <span class="challenge-score">{challenge.score}</span>
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
    .challenge-container {
        width: 90%;
        max-width: 1200px;
        margin: 2rem auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    h1 {
        text-align: center;
        color: #e0e0e0;
        margin-bottom: 2rem;
        font-size: 2.5rem;
    }

    .category-section {
        margin-bottom: 3rem;
    }

    .category-title {
        color: #b0b0b0;
        border-bottom: 2px solid #444;
        padding-bottom: 0.5rem;
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
    }

    .challenge-grid {
        display: grid;
        /* 更新点：各ブロックの最小幅を140pxに縮小しました。 */
        /* これにより、同じ行により多くのブロックを配置できます。 */
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem; /* ブロック間の余白 */
    }

    .challenge-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* 更新点：高さを固定値に戻し、少しだけ大きくしました。 */
        /* vh単位だと予期せぬレイアウト崩れが起きる可能性があるため、固定値の方が安定します。 */
        height: 160px;
        padding: 0.8rem; /* パディングを少し調整 */
        background-color: #2c3e50; /* 未解決問題の背景色 */
        color: #ecf0f1;
        border: 1px solid #34495e;
        border-radius: 8px;
        text-decoration: none;
        text-align: center;
        transition: transform 0.2s ease, background-color 0.2s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    .challenge-block:hover {
        transform: translateY(-5px); /* ホバー時に少し浮き上がる効果 */
    }

    /* 解決済みの問題のスタイル */
    .challenge-block.solved {
        background-color: #1a535c; /* 解決済みの背景色 */
        border-color: #4ecdc4;
    }
    
    .challenge-block.solved:hover {
        background-color: #2a636c;
    }

    .challenge-title {
        font-weight: bold;
        font-size: 0.9rem; /* フォントサイズを少し調整 */
        margin-bottom: 0.5rem;
    }

    .challenge-score {
        font-size: 0.8rem; /* フォントサイズを少し調整 */
        color: #bdc3c7;
    }

    .challenge-block.solved .challenge-score {
        color: #f7fff7;
    }
</style>
