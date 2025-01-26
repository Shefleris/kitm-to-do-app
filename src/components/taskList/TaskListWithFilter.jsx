import { useState } from "react";
import { TASK_PRIORITIES, TASK_STATES } from "../../constants/constants";
import TaskList from "./TaskList";
import { useProjectsContext } from "../../contexts/projectsContext";
import './taskListWithFilter.scss'

/**
 * the TaskList component produces a list of tasks filtered by conditions in props;
 * this wraps the component together with an interactive filter GUI
 * @param {object} props
 * @returns
 */
const TaskListWithFilter = ({
	applyDefaultFilter = { taskState: ["not started", "in progress"] },
	exceptionFields,
	exceptionType = "whitelist",
}) => {
	const [currentFilter, setCurrentFilter] = useState(Object.assign({}, applyDefaultFilter));

	const defaultFilterFields = ["taskState", "taskPriority", "projectId", "taskName"];
	const { projects, projectsLoading } = useProjectsContext();

	let filterFieldsSet = new Set(defaultFilterFields);
	if (exceptionFields) {
		switch (exceptionType) {
			case "blacklist":
				filterFieldsSet = filterFieldsSet.difference(new Set(exceptionFields)); //new in ES6
				break;
			case "whitelist":
			default:
				filterFieldsSet = new Set(exceptionFields);
				break;
		}
	}

	const filterDefinitions = {
		taskState: {
			displayFieldName: "Status",
			internalFieldName: "taskState",
			compareOperation: "in",
			availableOptions: TASK_STATES,
		},
		taskPriority: {
			displayFieldName: "Priority",
			internalFieldName: "taskPriority",
			compareOperation: "in",
			availableOptions: TASK_PRIORITIES,
		},
		projectId: {
			displayFieldName: "Project",
			internalFieldName: "projectId",
			compareOperation: "==",
			availableOptions: projectsLoading ? [] : projects.map((project) => ({ key: project.id, displayText: project.name })),
		},
		taskName: {
			displayFieldName: "Task",
			internalFieldName: "taskName",
			compareOperation: "substring",
		},
	};

	//#region filter UI components

	const handleCheckboxChange = (event, field) => {
		const fieldValueSet = new Set(currentFilter[field] ?? []);
		if (event.target.checked) {
			fieldValueSet.add(event.target.name);
		} else {
			fieldValueSet.delete(event.target.name);
		}
		setFieldFilter(field, Array.from(fieldValueSet));
	};

	const handleInputChange = (event) => {
		setFieldFilter(event.target.name, event.target.value);
	};

	const renderMultipleChoiceGroup = ({ field }) => {
		//TODO: instead of checkboxes, make "filter chips": https://m3.material.io/components/chips/guidelines#a31e974b-a1af-4d29-a107-11725a093e6d
		return (
			<div key={field} className="task_filter_row">
				<label>{filterDefinitions[field].displayFieldName}:</label>
				{filterDefinitions[field].availableOptions.map((i) => (
					<label key={i.key}>
						<input
							name={i.key}
							type="checkbox"
							defaultChecked={field in currentFilter && currentFilter[field].includes(i.key)}
							onChange={(event) => {
								handleCheckboxChange(event, field);
							}}
						></input>
						{i.displayText}
					</label>
				))}
			</div>
		);
	};

	const renderSelectBox = ({ field }) => {
		return (
			<div key={field}>
				<label>{filterDefinitions[field].displayFieldName}</label>
				<select name={field} defaultValue={currentFilter[field] ?? ""} onChange={handleInputChange}>
					<option value="">{`-${filterDefinitions[field].displayFieldName}-`}</option>
					{filterDefinitions[field].availableOptions.map((i) => (
						<option key={i.key} value={i.key}>
							{i.displayText}
						</option>
					))}
				</select>
			</div>
		);
	};

	const renderTextInput = ({ field }) => {
		return (
			<div key={field} className="task_filter_search">
				<label>{filterDefinitions[field].displayFieldName}</label>
				<input
					name={field}
					type="text"
					value={currentFilter[field] ?? ""}
					placeholder={filterDefinitions[field].displayFieldName}
					onChange={handleInputChange}
				></input>
			</div>
		);
	};

	//#endregion

	const setFieldFilter = (field, value) => {
		//GV: I know React has nicer solutions for partial state handling
		const modifiedFilter = Object.assign({}, currentFilter);
		//this condition should check if there is a meaningful value for applying filter on that field
		if (!value || (Array.isArray(value) && value.length === 0)) {
			delete modifiedFilter[field];
		} else {
			modifiedFilter[field] = value;
		}
		setCurrentFilter(modifiedFilter);
		// setCurrentFilter({ ...currentFilter, [field]: value });
	};

	// console.log(currentFilter);

	return (
		<>
			<div className="task_filters">
				{Array.from(filterFieldsSet).map((field) => {
					const def = filterDefinitions[field];
					if (def.availableOptions) {
						if (def.compareOperation === "in") {
							return renderMultipleChoiceGroup({ field });
						} else {
							return renderSelectBox({ field });
						}
					} else {
						return renderTextInput({ field });
					}
				})}
			</div>
			<TaskList filter={currentFilter} />
		</>
	);
};

export default TaskListWithFilter;
