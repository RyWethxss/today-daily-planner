# Graph Report - Today Daily Planner  (2026-10-12)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 16 nodes · 35 edges · 3 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6aa71ca3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2

## God Nodes (most connected - your core abstractions)
1. `renderTasks()` - 7 edges
2. `renderHabits()` - 6 edges
3. `render()` - 5 edges
4. `addHabit()` - 5 edges
5. `save()` - 5 edges
6. `showToast()` - 5 edges
7. `renderProgress()` - 3 edges
8. `freshState()` - 3 edges
9. `load()` - 3 edges
10. `uid()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `renderHabits()`  [EXTRACTED]
  app.js → app.js  _Bridges community 0 → community 1_
- `addHabit()` --calls--> `uid()`  [EXTRACTED]
  app.js → app.js  _Bridges community 1 → community 2_

## Import Cycles
- None detected.

## Communities (3 total, 0 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.42
Nodes (8): formatDue(), localDateKey(), openTask(), render(), renderProgress(), renderTasks(), setFilter(), visibleTasks()

### Community 1 - "Community 1"
Cohesion: 0.83
Nodes (4): addHabit(), renderHabits(), save(), showToast()

### Community 2 - "Community 2"
Cohesion: 0.67
Nodes (3): freshState(), load(), uid()

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderTasks()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Why does `render()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `addHabit()` connect `Community 1` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._