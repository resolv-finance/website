type AccordionItemProps = {
  id: number
  question: string
  answer: string
  clickHandler: React.MouseEventHandler
  currentFaq: number
}

export function AccordionItem({ id, question, answer, clickHandler, currentFaq }: AccordionItemProps) {
  return (
    <div className="border-b-gray-border border-b-2 py-4 last:border-0">
      <div className="flex flex-row items-center cursor-pointer" onClick={clickHandler}>
        <div className="accordion-button w-7 h-7 relative flex-shrink-0">
          <span className={`bg-blue-dark absolute duration-500 rounded-sm top-1/4 bottom-1/4 w-[7%] left-[47%] ${currentFaq === id ? "transition-transform rotate-90" : ""}`}></span>
          <span className={`bg-blue-dark absolute duration-500 rounded-sm h-[7%] top-[45%] ${currentFaq === id ? "transition-transform rotate-90 left-1/2 right-1/2" : "left-1/4 right-1/4"}`}></span>
        </div>
        <div className="font-semibold">{question}</div>
      </div>
      <div className={`text-sm ml-7 mt-2 overflow-hidden transition-[max-height] duration-500 ${currentFaq === id ? " max-h-96" : "max-h-0"}`} dangerouslySetInnerHTML={{ __html: answer }}></div>
    </div>
  )
}