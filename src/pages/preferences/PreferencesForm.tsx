import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { updatePreferences } from "../../context/preferences/action";
import { PreferencesContext } from "../../context/preferences/context";
import { Sport, Team } from "../../context/types";

const PreferencesForm = (props: {
  closeModal: () => void;
  availableSports: Sport[];
  availableTeams: Team[];
}) => {
  const { preferencesState, preferencesDispatch } =
    useContext(PreferencesContext);

  const [formState, setFormState] = useState(preferencesState.preferences);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const response = await updatePreferences(preferencesDispatch, formState);
    if (response.ok) props.closeModal();
  };

  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-2xl text-center mb-4 font-semibold leading-6"
      >
        My Preferences
      </Dialog.Title>
      <section>
        {/* <div className="mt-4 h-[300px] overflow-y-auto"> */}
        <div className="p-4">
          <p className="text-xl font-semibold my-2">Favourite Sports</p>
          <hr className="my-1" />
          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-4 grid-wrap gap-4 items-center p-2 mb-2">
              {preferencesState.isLoading ? (
                <div>Loading...</div>
              ) : (
                props.availableSports?.map((sport) => {
                  return (
                    <div key={sport.id}>
                      <input
                        id={`sport-${sport.id}`}
                        value={JSON.stringify(sport)}
                        name={sport.name}
                        checked={formState.sports.some(
                          (e) => e.id === sport.id
                        )}
                        onChange={(element) => {
                          console.log(
                            element.target.checked,
                            JSON.parse(element.target.value).id
                          );

                          setFormState({
                            sports: !element.target.checked
                              ? [
                                  ...formState.sports.filter(
                                    (e) =>
                                      e.id !==
                                      JSON.parse(element.target.value).id
                                  ),
                                ]
                              : [
                                  ...formState.sports,
                                  JSON.parse(element.target.value),
                                ],
                            teams: [...formState.teams],
                          });
                          // preferencesDispatch({
                          //   type: "UPDATE_SPORT_PREFERENCES",
                          //   payload: { sport },
                          // });
                          console.log(formState);
                        }}
                        type="checkbox"
                      />
                      <label className="mx-1" htmlFor={`sport-${sport.id}`}>
                        {sport.name}
                      </label>
                    </div>
                  );
                })
              )}
            </div>

            <br />
            <p className="text-xl font-semibold p-2 mb-2">Favourite Teams</p>
            <hr className="my-2" />
            <div className="grid sm:grid-cols-4 grid-wrap gap-4 items-center p-2">
              {preferencesState.isLoading ? (
                <div>Loading...</div>
              ) : (
                props.availableTeams?.map((team) => {
                  return (
                    <div key={team.id}>
                      <input
                        id={`${team.id}-${team.name}`}
                        name={team.name}
                        value={JSON.stringify(team)}
                        checked={formState.teams.some((e) => e.id === team.id)}
                        onChange={
                          (element) =>
                            setFormState({
                              sports: [...formState.sports],
                              teams: !element.target.checked
                                ? [
                                    ...formState.teams.filter(
                                      (e) =>
                                        e.id !==
                                        JSON.parse(element.target.value).id
                                    ),
                                  ]
                                : [...formState.teams, team],
                            })

                          // preferencesDispatch({
                          //   type: "UPDATE_TEAM_PREFERENCES",
                          //   payload: { team },
                          // })
                        }
                        type="checkbox"
                      />
                      <label
                        className="mx-1"
                        htmlFor={`${team.id}-${team.name}`}
                      >
                        {team.name}
                      </label>
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-4 text-center my-1">
              <button
                type="submit"
                className="inline-flex justify-center  border border-transparent bg-blue-600 px-2 py-1  text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Update
              </button>
              <button
                onClick={props.closeModal}
                type="submit"
                className="inline-flex justify-center  border border-transparent bg-gray-500 px-2 py-1 ml-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {/* </div> */}
      </section>
    </>
  );
};

export default PreferencesForm;
