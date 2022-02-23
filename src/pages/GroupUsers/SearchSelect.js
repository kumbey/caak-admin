const SearchSelect = ({ groups, selectedGroupName, handleChange, cats }) => {
  return (
    <div className="flex flex-col w-64  z-2 absolute top-44 left-11 items-center border -mt-6">
      <div className="bg-white overflow-y-auto  max-h-96 h-auto w-64">
        <ul>
          {groups
            .filter((group) =>
              group?.name
                ?.toLowerCase()
                .includes(selectedGroupName.toLowerCase())
            )
            .map((group, index) => {
              let icon;
              icon = cats.filter((cat) => cat.id === group.category.id);
              return (
                <div
                  className="flex items-center hover:bg-primary-100 cursor-default mb-1"
                  key={index}
                  onClick={() => handleChange(group.id, group.name)}
                >
                  {/* {`${icon[0]?.icon} ${group.name}`} */}
                  <div className="w-6">{icon[0]?.icon}</div>
                  <div>{group.name}</div>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchSelect;
