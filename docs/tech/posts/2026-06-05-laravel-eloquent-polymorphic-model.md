---
layout: doc
title: "[Daily Questions Challenge 11] 解釋 Laravel Eloquent Polymorphic Model"
description: 介紹 Laravel Eloquent 多型關聯的概念、資料表設計、常見使用情境，以及和一般關聯模型的差異與取捨。
date: 2026-06-05
avatar: /daily-questions-challenge.png
tags:
  - Backend
  - Laravel
  - Eloquent
head:
  - - meta
    - property: og:title
      content: "[Daily Questions Challenge 11] 解釋 Laravel Eloquent Polymorphic Model"
  - - meta
    - property: og:description
      content: 介紹 Laravel Eloquent 多型關聯的概念、資料表設計、常見使用情境，以及和一般關聯模型的差異與取捨。
  - - meta
    - name: twitter:title
      content: "[Daily Questions Challenge 11] 解釋 Laravel Eloquent Polymorphic Model"
  - - meta
    - name: twitter:description
      content: 介紹 Laravel Eloquent 多型關聯的概念、資料表設計、常見使用情境，以及和一般關聯模型的差異與取捨。
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 什麼是 Polymorphic Relationship？

在 Laravel Eloquent 中，Polymorphic Relationship 通常翻譯成「多型關聯」。

它解決的問題是：

> 同一個 Model，需要能夠關聯到多種不同類型的 Model。

假設一個系統裡有 `Post` 和 `Video`，兩者都可以被留言。如果不用 polymorphic relationship，可能會設計成：

- `post_comments`
- `video_comments`

或是在 `comments` 表裡同時放：

- `post_id`
- `video_id`

這兩種做法都會讓資料表設計變得僵硬。前者會讓相同概念的資料被拆成多張表，後者則會讓欄位越長越多，而且大部分欄位在單筆資料中都會是 `null`。

Polymorphic relationship 的做法，是讓 `comments` 這張表透過一組欄位記錄「這則留言屬於哪一筆資料」以及「那筆資料是哪一種 Model」。

例如：

```text
comments
  id
  body
  commentable_id
  commentable_type
```

其中：

- `commentable_id`：代表目標資料的 id。
- `commentable_type`：代表目標資料的 Model 類型，例如 `App\Models\Post` 或 `App\Models\Video`。

因此，`Comment` 可以透過同一組欄位，同時支援「留言屬於文章」和「留言屬於影片」兩種關係。

## Laravel 中的常見寫法

以「文章和影片都可以有多則留言」為例，`Comment` 是 polymorphic child model，因為它要能夠屬於不同類型的 parent model。

在 `Comment` model 中，會使用 `morphTo()`：

```php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }
}
```

在 `Post` 和 `Video` 中，則使用 `morphMany()`：

```php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Post extends Model
{
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
```

```php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Video extends Model
{
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
```

這裡的 `commentable` 是關聯名稱。Laravel 會根據這個名稱，對應到 `commentable_id` 和 `commentable_type` 兩個欄位。

使用時可以像一般 Eloquent relationship 一樣操作：

```php
$post = Post::find(1);

foreach ($post->comments as $comment) {
    // ...
}
```

反過來，也可以從留言取得它所屬的 parent model：

```php
$comment = Comment::find(1);

$parent = $comment->commentable;
```

此時 `$parent` 可能是 `Post`，也可能是 `Video`。

## 常見的多型關聯類型

Laravel Eloquent 支援幾種常見的 polymorphic relationship。

### One to One（一對一）

One-to-one polymorphic relationship 適合「多種 Model 都可以擁有一個相同類型的附屬資料」。

例如：

- `User` 可以有一張頭像圖片。
- `Post` 也可以有一張封面圖片。
- 兩者都共用 `images` 表。

此時 `Image` 會有：

```text
imageable_id
imageable_type
```

在 parent model 端可以使用 `morphOne()`，在 `Image` 端則使用 `morphTo()`。

### One to Many（一對多）

One-to-many polymorphic relationship 是最常見的形式。

例如：

- `Post` 有多則 `Comment`。
- `Video` 也有多則 `Comment`。
- `Comment` 只需要一張表。

parent model 使用 `morphMany()`，child model 使用 `morphTo()`。

### Many to Many（多對多）

Many-to-many polymorphic relationship 適合多種 Model 共用同一組可重複關聯的資料。

例如：

- `Post` 可以有多個 `Tag`。
- `Video` 也可以有多個 `Tag`。
- 同一個 `Tag` 可以同時被文章和影片使用。

這時通常會有一張 pivot table，例如：

```text
taggables
  tag_id
  taggable_id
  taggable_type
```

在 `Post` 和 `Video` 端會使用 `morphToMany()`，在 `Tag` 端則使用 `morphedByMany()` 來定義反向關聯。

## 和一般關聯的差異

一般的一對多關聯通常會有明確外鍵，例如：

```text
comments
  id
  post_id
  body
```

這代表 `Comment` 明確屬於 `Post`。

Polymorphic relationship 則會把外鍵拆成「id + type」：

```text
comments
  id
  commentable_id
  commentable_type
  body
```

這代表 `Comment` 不只可以屬於 `Post`，也可以屬於 `Video` 或其他 Model。

所以兩者最大的差異是：

- 一般關聯：關聯對象固定，資料庫語意比較明確。
- 多型關聯：關聯對象可變，彈性比較高。

如果關聯對象只有一種，而且未來也不太可能增加，普通的 `hasMany()` / `belongsTo()` 通常比較直覺。如果同一種資料確實會被多種 Model 共用，polymorphic relationship 才會比較適合。

## 使用時要注意什麼？

Polymorphic relationship 很方便，但不是每個情境都適合。

### 1. 資料庫外鍵約束較難直接表達

一般 `post_id` 可以直接建立 foreign key 指向 `posts.id`。

但 `commentable_id` 可能指向 `posts.id`，也可能指向 `videos.id`。單一欄位要同時對應多張表，在關聯式資料庫中就不容易用傳統 foreign key 約束表達。

因此 polymorphic relationship 通常會把一部分資料完整性的責任交給應用程式處理。

### 2. 查詢條件可能更複雜

如果要查「所有屬於文章的留言」，就需要同時判斷：

```sql
commentable_type = 'App\\Models\\Post'
```

如果系統中有很多 polymorphic model，查詢、索引設計、資料分析都會比單純外鍵關聯更需要留意。

### 3. Model class 名稱可能被寫進資料庫

Laravel 預設會把完整的 class name 存進 `*_type` 欄位，例如 `App\Models\Post`。

這很方便，但也代表如果之後重新命名 Model 或搬 namespace，資料庫裡的舊值可能需要一起處理。

Laravel 提供 morph map，可以把資料庫中的 type 改成比較穩定的字串，例如：

```php
use Illuminate\Database\Eloquent\Relations\Relation;

Relation::enforceMorphMap([
    'post' => App\Models\Post::class,
    'video' => App\Models\Video::class,
]);
```

這樣資料庫可以存 `post`、`video`，而不是直接存完整 class name，能降低程式碼結構調整對資料的影響。

## 總結

Laravel Eloquent Polymorphic Relationship 的核心，是用一組 `*_id` 和 `*_type` 欄位，讓同一張表可以關聯到多種不同 Model。

它適合用在「同一種資料可以附著在多種主體上」的情境，例如留言、圖片、標籤、活動紀錄等。

不過，polymorphic relationship 不是為了取代所有關聯設計。當關聯對象固定時，普通的一對一、一對多或多對多關聯通常更清楚。只有在多種 Model 真的需要共用同一種關聯資料時，才應該考慮使用 polymorphic relationship。

## 參考

- [Eloquent: Relationships - Laravel Documentation](https://laravel.com/docs/13.x/eloquent-relationships#polymorphic-relationships)
- [Database: Migrations - Laravel Documentation](https://laravel.com/docs/13.x/migrations)
