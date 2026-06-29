# DatePicker Library

React calendar library built with a focus on architectural clean code and flexibility. The library employs the Decorator and Observer patterns to manage complex logic and dynamically add functionality like holiday highlighting, range selection, and TODO management.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Storybook](#storybook)

---

## Features

- **Flexible Views:** Switch between standard month view and week-by-week view.
- **Decorator Pattern:** Logic is extended via decorators (Range, Holiday, Todo, etc.).
- **Customization:**
  - Choose week start (Monday or Sunday).
  - Toggle weekend visibility.
  - Highlight custom holiday dates.
- **Boundary Control:** Set `minDate` and `maxDate` limits.
- **TODO Integration:** Add and save tasks for specific days in `localStorage`.
- **Theming:** Full support for Light and Dark modes.
- **Input Support:** Manual date entry with validation.
- **Robustness:** test coverage and Error Boundary protection.

---

## Architecture

The project follows FSD methodology:

- **Entities:** Core calendar logic, types, and the base CalendarCell.
- **Features:** Implementation of the DatePicker with Input and Todo integration.
- **Shared:** Reusable UI components, helpers, and hooks.

### The Decorator Pattern

The core logic is handled by a `BaseCalendarEngine`. Specific features are added by wrapping the engine:

1. `HolidayDecorator`: Injects holiday status into days.
2. `WeekendDecorator`: Identifies weekends.
3. `RangeDecorator`: Manages date range selection logic.
4. `TodoDecorator`: Connects days with local storage tasks.
5. `FromMondayDecorator`: Start week from Monday.
6. `MinMaxDecorator`: Minimum and maximum selectable date.
7. `ViewByWeekDecorator`: View by week.

---

## Technologies

- **Core:** React 19, TypeScript, SCSS
- **Build Tools:** Rollup, Babel
- **Code Quality:** ESLint, Prettier, Husky, Commitlint
- **Testing:** Jest, react testing library
- **Documentation:** Storybook, Chromatic
- **CI/CD:** GitHub Actions

---

## API Reference

Note: All properties are optional.

| Prop          | Type      | Default        | Description                         |
| :------------ | :-------- | :------------- | :---------------------------------- |
| `fromMonday`  | `boolean` | `false`        | Start the week on Monday.           |
| `withHoliday` | `boolean` | `false`        | Enable holiday highlighting.        |
| `holidays`    | `Date[]`  | `[]`           | Array of holiday dates.             |
| `withWeekend` | `boolean` | `false`        | Highlight or show weekends.         |
| `minDate`     | `Date`    | `undefined`    | Minimum selectable date.            |
| `maxDate`     | `Date`    | `undefined`    | Maximum selectable date.            |
| `defaultDate` | `Date`    | `current date` | Initial date displayed in calendar. |
| `viewByWeek`  | `boolean` | `false`        | Toggle between month and week view. |
| `withRange`   | `boolean` | `false`        | Enable date range selection.        |
| `withTodo`    | `boolean` | `false`        | Enable task management system.      |
| `darkThemed`  | `boolean` | `false`        | Enable dark theme.                  |

---

## Storybook

Visual documentation and component isolation are handled by Storybook. You can explore all decorators and features in the interactive environment.

```bash
# locally
npm run storybook
```

**Available Stories:**

- `Decorators/Calendar`: Basic configurations.
- `Decorators/RangeCalendar`: Selection of date ranges.
- `Features/CalendarWithTodo`: Full TODO functionality.
- `Features/CalendarWithInput`: Input-driven date selection.

---

## 🔌 Installation

```bash
npm install datepicker-pashuk
# or
yarn add datepicker-pashuk
```

## Component Modes & Usage

Choose the component that best fits your specific use case.

### 1. Basic Calendar

Standard calendar for single date selection.

```tsx
import { Calendar } from 'datepicker-pashuk';

<Calendar />;
```

You can add any props from API:

```tsx
import { Calendar } from 'datepicker-pashuk';

<Calendar fromMonday={true} withWeekend={true} darkThemed={false} />;
```

### 2. Range Selection

Enables period selection logic. The first click sets the start date, and the second click sets the end date. The range between them is visually highlighted.You can add any props from API

```tsx
import { RangeCalendar } from 'datepicker-pashuk';

<RangeCalendar withRange={true} />;
```

### 3. Manual Input Integration

A composition of a text input and a calendar. Features real-time manual entry validation and bidirectional synchronization between the input field and the calendar view.You can add any props from API

```tsx
import { CalendarWithInput } from 'datepicker-pashuk';

<CalendarWithInput />;
```

### 4. Task Management (Todo)

Integrates a task scheduler. Users can add notes to specific dates, which are persisted via `localStorage`. Dates with tasks are marked with a visual indicator.You can add any props from API

```tsx
import { CalendarWithTodo } from 'datepicker-pashuk';

<CalendarWithTodo />;
```
