import { Fragment, useEffect, useState } from "react";
import { fetchArticleById } from "../../context/articles/action";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";

type Article = {
  id: 21;
  title: "Upset Victory as Underdog Team Defeats League Leaders";
  summary: "In a stunning upset, an underdog team overcomes the odds to defeat the league leaders, sending shockwaves through the footballing world.";
  thumbnail: "https://images.pexels.com/photos/61143/pexels-photo-61143.jpeg?auto=compress&cs=tinysrgb&w=1440";
  sport: {
    id: 2;
    name: "American Football";
  };
  date: "2023-08-01T12:07:01.967Z";
  content: "In a match that defied all expectations, an underdog team delivered a remarkable upset by defeating the league leaders in a thrilling encounter. The match showcased the unpredictable nature of football, as the underdog team displayed immense determination, tactical brilliance, and clinical finishing. The victory has sent shockwaves through the footballing world, highlighting the magic and unpredictability that makes the sport so captivating.\n\nThe underdog's triumph serves as a reminder that in football, anything is possible. It demonstrates the importance of teamwork, belief, and seizing opportunities when they arise. The victory not only boosts the underdog's confidence but also adds a new dimension to the league, injecting excitement and uncertainty into the title race.\n\nThe footballing world is buzzing with discussions and analysis of this surprising result. Fans and pundits are marveling at the underdog's resilience, as well as questioning the league leaders' performance on the day. This thrilling upset will forever be etched in the memories of both the underdog's fans and football enthusiasts worldwide.";
  teams: [];
};
const formattedDate = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  return new Date(date).toLocaleDateString("en-US", options);
};

const ArticleModal = () => {
  const navigate = useNavigate();
  const { articleId } = useParams();

  const [isOpen, setIsOpen] = useState(true);
  const [article, setArticle] = useState<Article>();
  useEffect(() => {
    handleModalOpen(articleId ? articleId : "27");
  }, [articleId]);
  const closeModal = () => {
    setIsOpen(false);
    navigate("../../");
  };

  const handleModalOpen = async (id: string) => {
    const response = await fetchArticleById(id);
    if (response.ok) setArticle(response.data);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl mb-4 font-semibold leading-6"
                  >
                    {article?.title}
                  </Dialog.Title>

                  <div className="mt-2">
                    <img
                      className="w-full h-[210px] object-cover rounded-lg"
                      src={article?.thumbnail}
                    />
                  </div>
                  <section>
                    <div className="mt-2">
                      <p className="text-lg font-semibold text-gray-700">
                        {formattedDate(article ? article.date : "")}
                      </p>
                    </div>
                    <hr />
                    <div className="mt-4 h-[300px] overflow-y-auto">
                      <p className="text-xl font-semibold ">
                        {article?.content}
                      </p>
                    </div>
                  </section>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cool!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default ArticleModal;
