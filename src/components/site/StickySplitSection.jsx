export default function StickySplitSection({
  leftContent,
  rightContent,
  className = '',
  leftClassName = '',
  rightClassName = '',
  columnsClassName = 'lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]',
  stickyTopClassName = 'lg:top-28',
}) {
  return (
    <div className={`grid items-start gap-10 lg:gap-14 ${columnsClassName} ${className}`}>
      <div className={`min-w-0 lg:min-h-[calc(100vh-8rem)] ${leftClassName}`}>
        <div className={`lg:sticky ${stickyTopClassName}`}>{leftContent}</div>
      </div>

      <div className={`min-w-0 ${rightClassName}`}>{rightContent}</div>
    </div>
  );
}
