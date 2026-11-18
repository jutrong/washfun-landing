# 아이콘 출처

이 폴더의 SVG는 [Remix Icon](https://remixicon.com) v4.9.1에서 고친 것 없이 가져왔다.

- 저작권: Remix Design
- 라이선스: Apache License 2.0 (https://www.apache.org/licenses/LICENSE-2.0)

아이콘을 추가할 때는 `meta.json`에 모양 이름과 한글 검색어를 적고 아래 명령을 돌린다.

```bash
npm pack remixicon && tar xzf remixicon-*.tgz
node design-system/scripts/import-remix-icons.mjs package
```
