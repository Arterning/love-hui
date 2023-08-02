# truncate table score_history;

-- Set the variables for date range
SET @start_date = '2023-07-01';
SET @end_date = '2023-08-01';

-- Set the seed for the random number generation
SET @seed = UNIX_TIMESTAMP();

-- Generate records for each day within the specified date range
SET @current_date = @start_date;

-- 生成指定日期范围内每天的记录
INSERT INTO score_history (score, partnerId, date, create_at)
SELECT FLOOR(RAND() * 50), '1', dates.date, CURRENT_TIMESTAMP
FROM (
    -- 使用递归公用表达式 (CTE) 生成日期范围
    WITH RECURSIVE date_range AS (
        SELECT @start_date AS date
        UNION ALL
        SELECT DATE_ADD(date, INTERVAL 1 DAY) FROM date_range
        WHERE DATE_ADD(date, INTERVAL 1 DAY) <= @end_date
    )
    -- 从CTE中选择日期并插入随机score记录
    SELECT date FROM date_range
) dates;
