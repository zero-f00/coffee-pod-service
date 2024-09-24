import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja'; // 日本語ロケールをインポート
import { formatWithOptions } from 'date-fns/fp';

// カレンダーに表示する営業日をハイライトするためのスタイル
const tileClassName = ({ date }: { date: Date }, businessDays: Date[]) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const isBusinessDay = businessDays.some(
        (businessDay) => format(businessDay, 'yyyy-MM-dd') === formattedDate
    );
    return isBusinessDay ? 'highlight' : '';
};

// 営業日カレンダーコンポーネント
const BusinessCalendar: React.FC<{ businessDays: Date[] }> = ({ businessDays }) => {
    return (
        <Calendar
            locale="ja-JP" // 日本語対応
            tileClassName={(props) => tileClassName(props, businessDays)}
            view="month"
            tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6} // 土日を非営業日として無効化
        />
    );
};

export default BusinessCalendar;
