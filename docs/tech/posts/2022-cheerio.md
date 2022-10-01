---
layout: doc
title: JavaScript爬蟲筆記 - <br /> 使用cheerio取得路跑賽事資料
description: 用JavaScript爬蟲
date: 2022-10-02
avatar: /./2022-cheerio/cover.png
tags:
  - JavaScript
  - Nodejs
  - Cheerio
---

<script setup>
  import ArticleTitle from '@theme/components/ArticleTitle.vue'
  import ScrollToTopBtn from '@theme/components/ScrollToTopBtn.vue'
</script>

<ArticleTitle />

<ScrollToTopBtn />

## 前言
會開始接觸爬蟲，是因為某天突然想做一個路跑相關資訊的Side Project，將台灣的路跑賽事整理到自己做的網站裡面。

因為這方面的資訊並沒有公開的API資料，於是我決定用網頁爬蟲的方式將資料取得後，丟進自己專案的資料庫中，在實作過後我認為做爬蟲的Side Project蠻有趣的，而且對於剛接觸程式的人來說也不會到非常困難，蠻適合作為個人作品的素材之一，因此決定在這篇文章分享出來。

另外自己在爬蟲技術方面純屬業餘，所以如果你今天想看的是工作需求上的爬蟲開發，或是Python爬蟲的話可以跳過這篇 XD

## 關於爬蟲
網頁爬蟲是可以透過程式將網頁上的資訊抓取下來的一種方式，對於沒有公開API的資料，技術原理基本上就是爬取網頁HTML的資料去得到你想得到的資訊。

透過爬蟲的方式取得資料的優點大概有幾個:

- 不需要對方提供API也能取得想要得到的資訊
- 只要是網站上看得到的資料基本上都有辦法取得
- 適合用來分析或整理多個不同網站資訊，例如各大電商網站商品的歷史價格分析等

爬蟲的缺點:

- 無法保證能夠長期取得資料，當網站改版時原本寫好的程式就拿不到資料了
- 無法保證資料型態的正確性，爬蟲爬回來到資料不像API有完整的規範和固定格式
- 因為透過爬蟲得到的資料都是網頁上呈現的內容，可能還需要多做一些資料的額外處理(ex. 排除不要的文字內容，轉換資料型別等)

## 爬蟲要注意的的事情

爬蟲我認為第一個需要知道的就是: 你不知道對方網站什麼時候會改版，所以如果你想要爬的是一個經常變動的網頁，可能人家一改版就需要跟著去調整你的程式。

因此我在這次實作上是選擇了一個幾乎沒在改版的網站 XD

另外就是有些網站是會有反爬蟲機制，透過token或是真人驗證去防止惡意爬蟲行為，如果想爬的網站有做這些機制的話可能在實作上的難度就會比較高。

## 此篇使用的技術棧

這次在實作爬蟲方面主要是使用[NodeJs](https://nodejs.org/en/) + [cheerio](https://cheerio.js.org/)這個JavaScript爬蟲套件來開發，會選擇用JavaScript來爬蟲的原因單純是因為我會JavaScript XD

~~這樣我就不用在研究Python爬蟲要怎麼做了。~~

也因為是用JavaScript，所以對像我一樣剛開始寫程式沒多久的開發者，或是前端工程師來說應該會比Python爬蟲的學習成本更低。

另外，原先這個Side Project是用原生NodeJs + [express](https://expressjs.com/)環境開發，但在後期重構時為了想要更清楚的定義資料型別、程式設計架構上有個較好的規範，所以轉換成NodeJs的框架[NestJs](https://nestjs.com/) + [TypeScript](https://www.typescriptlang.org/)。

因此在這篇文章的程式碼都會以NestJs框架 + TypeScript來提供，在爬蟲方面的實作原則上和原生JavaScript差別並不會太大，如果有針對NestJs特性的地方會在文章中特別說明。

資料庫的部分則是使用mondgoDB，搭配[mongoose](https://mongoosejs.com/)套件與DB溝通。

## 爬蟲素材

<ZoomImg src="./2022-cheerio/marthon-page-example.png
" alt="marthon-page-example" />

這次要爬的網站是[跑者廣場::全國賽會](http://www.taipeimarathon.org.tw/contest.aspx)這個網站。

這個網站是想找國內近期舉辦的馬拉松賽事蠻常會到訪的網站之一，我大概接觸路跑賽事的時間有五年了，這個網站在五年前就是這樣的畫面，幾乎沒有什麼改版，因此很適合作為這次Side Project的爬蟲素材。

## 實作

正式開始實作，在這邊就跳過基本環境建置，從需要的套件安裝開始。

首先當然就是要在你的nodeJs環境安裝這次需要的用到的套件cheerio，這邊就看你的套件管理是用npm、yarn或是pnpm去安裝：

```
# npm install cheerio
# yarn add cheerio
# pnpm install cheerio
```

再來是實作部分，專案主要是以nestJs的module - controller - service - model的架構來開發。

因為這篇主要是分享爬蟲實作，在這邊就不特別介紹nestJs的設計模式，只會放上service層和爬蟲有關的程式碼。

那麼正題開始，首先當然就是要透過http request去拿到整個網站頁面。

```
# event.service.ts

import * as cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventService {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  getEventsBodyFromOrg(): Promise<AxiosResponse> {
    return this.httpService.axiosRef.get(
      'http://www.taipeimarathon.org.tw/contest.aspx',
    );
  }
}
```

在這邊使用的是和nestJs[整合過的axios](https://docs.nestjs.com/techniques/http-module)來得到整個想要爬取網站的完整內容，我們將它提供的HttpService注入進來使用`get`呼叫。`@Injectable()`這個則是NestJs提供的裝飾器方法(Decorator)，使得這個`EventService`可以被NestJs的Ioc管理和依賴注入(Dependency injection)。

接著就來實作爬蟲和資料儲存的部分。

```
  async updateEvents(): Promise<void> {
    const fetchResult = await this.getEventsBodyFromOrg();
    if (fetchResult.status === HttpStatus.OK) {
      try {
        this.eventModel.deleteMany({}).exec();
        const eventOutputDtos = this.crawlerEvents(fetchResult.data);
        eventOutputDtos.map((event) => {
          new this.eventModel(event).save();
        });
        return;
      } catch (error) {
        throw EVENT_MESSEAGE.ERROR_UPDATE_EVENT;
      }
    }
    throw EVENT_MESSEAGE.ERROR_UPDATE_EVENT_API_REQUEST;
  }
```

先建立一個`updateEvents`的function。

在這個`updateEvents`中會先去呼叫剛剛用來取得頁面的`getEventsBodyFromOrg`，然後再透過`crawlerEvents`這個function將response得到的頁面透過爬蟲方式整理出需要的資料。

目前程式的實作是每次做`updateEvents`時就將原先的mongoDB的資料清空再重新取得，會這樣做主要是爬蟲得到的資料沒有固定ID，當賽事資料有更新的時候單純用賽事名稱不一定能判斷是否為同一場賽事(但實作上還是有辦法透過名稱、賽事地點、日期等方式做判斷，因為目前需求上沒有需要舊資料，因此就以刪除再更新的方式實作。

throw的部分，如果沒有得到response資料或是資料處理過程失敗，就拋出透過enum定義的error message，

接著就來說明一下cheerio的使用方式。

```
  import * as cheerio from 'cheerio';

  crawlerEvents(body: string): EventOutputDto[] {
    const result: EventOutputDto[] = [];
    const $ = cheerio.load(body);
    const tr = $('table.gridview tr');

    let lastRecordMonthIndex;
    let year = moment().format('YYYY');

    for (let i = 1; i < tr.length; i++) {
      const td = tr.eq(i).find('td');

      const month = this.getMonth(td);
      if (month) {
        const monthIndex = this.getMonthIndex(month);
        year = this.getYear(year, monthIndex, lastRecordMonthIndex);
        lastRecordMonthIndex = monthIndex;
      }

      result.push(this.transformEvent(td, year));
    }

    return result;
  }
```

當我們把cheerio引入進來後就可以透過套件來爬蟲了。

在這邊我們將剛剛從跑者廣場的得到的HTML body丟進`cheerio.load()`的方法中，並且宣告一個變數`$`，再來就可以用`$`來取得指定的DOM節點了。

如果你問我說`$`的用法是不是很熟悉？ 沒錯！

它就是熟悉的Jquery控制DOM的用法 XD

所以前面有提到過用JavaScript爬蟲的學習成本較低，只要你會寫JavaScript，甚至用過Jquery那你就會爬蟲了。

<ZoomImg src="./2022-cheerio/console.png
" alt="console" />

再來就是打開瀏覽器的console，來看看你想要拿的資料在DOM的哪個位置，然後用Jquery就可以爬蟲了，已這次的情境來說，想要的資料就在table裡面，所以我們取得全部的tr，再透過for迴圈將每筆路跑賽事需要的資料欄位從td裡面提取出來。

每筆賽事要取得資料的程式碼，則是透過下面這段private function`transformEvent`

```
  private transformEvent(td: cheerio.Cheerio, year: string): EventOutputDto {
    const title = this.getTitle(td);
    const [date, time] = this.getDateTime(td);
    const entry = this.getEntry(td);
    const [entryStartDate, endtryEndDate] = this.getEntryStartAndEnd(
      year,
      entry,
    );
    const event = {
      eventName: this.getEventName(title),
      eventInfo: this.getEventInfo(title),
      eventLink: this.getLink(td),
      eventStatus: this.getEventStatus(td),
      eventCertificate: this.getEventCertificate(td),
      eventDate: this.getDate(year, date),
      eventTime: this.getEventTime(time),
      location: this.getLocation(td),
      distances: this.getDistances(td),
      agent: this.getAgent(td),
      entryIsEnd: this.checkEntryIsEnd(entry),
      entryStartDate: entryStartDate,
      entryEndDate: endtryEndDate,
    };

    return event;
  }
```

在這邊我們將要取得的key值資料的邏輯都解耦，讓可讀性增加，將想要得到的資料都整理過後回傳`EventOutputDto`結構的物件資料，回傳到上面的function`crawlerEvents`中`EventOutputDto[]`型別的陣列中。

`EventOutputDto`的結構如下，@ApiProperty()這個則是nestJs用來撰寫swagger文件提供的方法：

```
  import { ApiProperty } from '@nestjs/swagger';
  import { EVENT_CERTIFICATE } from '../enum/event-certificate.enum';
  import { EVENT_STATUS } from '../enum/event-status.enum';
  import { EventDistanceDto } from './event-distance.dto';

  export class EventOutputDto {
    @ApiProperty({ description: '賽事名稱', example: '田中馬拉松' })
    eventName: string;
    @ApiProperty({
      description: '賽事資訊',
      example: '延期至2100年',
      nullable: true,
    })
    eventInfo: string | null;
    @ApiProperty({
      description: '賽事官網連結',
      example: 'https://tw-marathons.bibiota.com/events',
      nullable: true,
    })
    eventLink: string | null;
    @ApiProperty({
      example: 0,
      description: '活動狀態 - 0:延期或取消, 1: 正常舉行',
    })
    eventStatus: EVENT_STATUS;
    @ApiProperty({
      example: 1,
      description:
        '賽事證書 - 1: IAAF認證賽事, 2: AIMS認證賽事, 3: 賽事路線經IAAF/AIMS測量員丈量',
      nullable: true,
    })
    eventCertificate: EVENT_CERTIFICATE | null;
    @ApiProperty({
      description: '舉辦日期',
      example: '2020-01-01',
    })
    eventDate: string;
    @ApiProperty({
      description: '起跑時間',
      example: '08:00',
      nullable: true,
    })
    eventTime: string | null;
    @ApiProperty({
      description: '舉辦地點',
      example: '彰化縣立景崧文化教育園區',
    })
    location: string | null;
    @ApiProperty({
      description: '賽事距離',
      type: [EventDistanceDto],
    })
    distances: EventDistanceDto[];
    @ApiProperty({
      description: '主辦單位',
      example: '彰化縣政府',
      nullable: true,
    })
    agent: string | null;
    @ApiProperty({
      description: '是否結束報名',
      example: true,
    })
    entryIsEnd: boolean;
    @ApiProperty({
      description: '報名開始日期',
      example: '2020-01-01',
      nullable: true,
    })
    entryStartDate: string | null;
    @ApiProperty({
      description: '報名結束日期',
      example: '2020-01-01',
      nullable: true,
    })
    entryEndDate: string | null;
  }
```

下面則是部分爬蟲資料處理的程式碼，基本上就是去找到想找的東西在哪裡：

```
  private getMonth(td: cheerio.Cheerio): string | null {
    return td.eq(0).find('span').text() ?? null;
  }
  private getLocation(td: cheerio.Cheerio): string | null {
    const location = td.eq(4).text().trim();
    return location != '' ? location : null;
  }

  private getAgent(td: cheerio.Cheerio): string | null {
    const agent = td.eq(6).text().trim();
    return agent != '' ? agent : null;
  }

  private getEntry(td: cheerio.Cheerio): string {
    return td.eq(7).text().trim().replace(/\s/g, '');
  }
```

如果想看完整的EventService及相關程式碼可以參考[Github](https://github.com/BIBIOTA/tw-marathon-api/blob/1a3735ea76030f55a16381c0f5cfc1abb161fca6/src/event/event.service.ts)。講到這邊，我差不多就把cheerio的使用方式都講完了 XD

如果還有想知道其他的使用方式可以參考[官方文件](https://cheerio.js.org/modules.html)。

## 坑

接著就來講一下坑的部分，這次遇到的坑基本上都不是在套件或框架上，而是從跑者廣場拉回來的資料中。

前面也有提到過，爬蟲得來的資料除了較難保證資料型別或格式的規範外，網頁上的資料也不一定是你需求想要的樣子，因此可能需要很多額外的程式處理。

在下面我就分享幾個遇到的問題：

1. 網頁呈現的日期和實際需要的日期格式差異

<ZoomImg src="./2022-cheerio/date.png" alt="date" />

因為想要做賽事日期的搜尋功能，但可以看到網頁上的賽事是以日期順序排列，但沒有顯示年份，也因此只能透過上一筆賽事的日期去判斷是否為這個年度的賽事。同樣的問題在報名日期也有，這邊只能透過該場賽事的舉辦日期回推可報名的日期年份是在什麼時間。

2. 網頁文字中使用的特殊符號全形半形問題

比如說今天想要取得路跑賽事名稱，在網頁上名稱呈現的方式有可能是`2023 XXX 路跑賽事 (由2022/3/27延期)`，後面的括號是當該賽事有延期或取消舉辦時可能會出現的內容。

因為在資料儲存上比較希望是單純將賽事名稱和後面附帶的賽事資訊分開成不同欄位來儲存，因此在實作中有需要對這段文字做一些切割和判斷。

不過這時就發現一個問題，也許是因為網站後台是不同人輸入名稱的關係，在這邊使用到的括號有可能是`（）` 或是 `()`，就是不同筆資料的括號不一定是一樣的 XD

所以在程式處理名稱這段就做了以下的方式來做處理：

```
  private getEventName(title: string): string {
    const { first, last } = this.getBrackets(title);
    if (first === null && last === null) {
      return title;
    }
    return title.substring(0, title.indexOf(first));
  }

  private getEventInfo(title: string): string | null {
    const { first, last } = this.getBrackets(title);

    if (first === null && last === null) {
      return null;
    }

    return title.substring(title.indexOf(first) + 1, title.indexOf(last));
  }

  private getBrackets(title: string): any {
    const brackets = {
      first: null,
      last: null,
    };
    if (title.includes('（')) {
      brackets.first = '（';
    } else if (title.includes('(')) {
      brackets.first = '(';
    }

    if (title.includes('）')) {
      brackets.last = '）';
    } else if (title.includes(')')) {
      brackets.last = ')';
    }

    return brackets;
  }
```

3. 資料型態的轉換

<ZoomImg src="./2022-cheerio/distances.png" alt="distances" />

在跑者廣場中的賽事項目里程數是以純文字方式去呈現，不過如果在DB想要有比較有效且效能較好的方式搜尋，把這邊的文字轉成純int，在後續實作搜尋時才會比較好進行開發，程式碼如下：

```
  private getDistances(td: cheerio.Cheerio): EventDistanceDto[] {
    const distancesElement = td.eq(5).find('button');
    const distances: EventDistanceDto[] = [];
    if (distancesElement.length > 0) {
      for (let i = 0; i <= distancesElement.length - 1; i++) {
        const data = distancesElement.eq(i).html();
        let distance = null;
        let complexDistance = null;
        if (
          !data.includes('+') &&
          data.includes('K') &&
          !isNaN(parseFloat(data.replace('K', '')))
        ) {
          distance = parseFloat(data.replace('K', ''));
        } else {
          complexDistance = data;
        }
        const distanceInfo = distancesElement.eq(i).attr('title').split('：');
        const eventPrice = parseInt(distanceInfo[1].split('<br/>')[0].trim());
        const eventLimit = parseInt(distanceInfo[2]);
        distances.push({
          distance,
          complexDistance,
          eventPrice: isNaN(eventPrice) ? null : eventPrice,
          eventLimit: isNaN(eventLimit) ? null : eventLimit,
        });
      }
    }

    return distances;
  }
```

這裡的資料除了單純的公里數+K以外，可能的情境還有xxK+xxK+xxK(鐵人三項)，有時也可能是純文字(ex. `線上跑`)，所以在這邊的處理上就選擇了只將馬拉松賽事能夠取得公里數的資料存成int，其他項目或無法確定的文字資料就以string格式存在不同欄位，這也是爬蟲上比較難將資料乾淨處理的一個痛點之一。

## 總結

在今天示範了如何透過JavaScript來實現簡單的網頁爬蟲，如果是叫單純的一頁式網頁爬蟲來說，用這個方式來實作可以說是非常的簡單方便。

不過，在商業上的爬蟲開發肯定是比這次來的更加複雜的，可能還會有需要動態的使用者行為模擬、驗證的檢查、反爬蟲機制等問題需要去解決。

這方面個人也還沒有實際接觸過，就看未來還有沒有機會去實作更進階的網頁爬蟲了。

這次的後端原始碼都放在我的[Github](https://github.com/BIBIOTA/tw-marathon-api)上供大家自由參考。

也可以直接到[marathontw.bibiota.com/events](https://marathontw.bibiota.com/events)，實際打看看這次實作的取得賽事API，API文件可以到[swagger](https://marathontw.bibiota.com/api)上查看。

另外也有實作一個可簡單查詢賽事資料的[前端網頁](https://marathontw-web.bibiota.com/)，原始碼一樣可以到[Github](https://github.com/BIBIOTA/tw-marathon-website)參考。因為個人不是前端工程師，所以在UI上面我就沒有做太多工 XD

以上的實作都是個人的一個小小Side Project，如果對於這篇文章或是這個Side Project開發有任何建議或回饋，都歡迎[私訊作者](https://t.me/BiBiOTA)，希望這次的分享也能夠對個人或工作上的專案開發帶來一些想法：）