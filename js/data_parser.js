// load and parse the YAML data
fetch('src/data.yaml').then(response => response.text()).then(data => {
	// create all require dynamic elements
	const parsedData = jsyaml.load(data);
	const headerProfileDiv = document.getElementById('yaml-header-profile');
	const headerPortfolioDiv = document.getElementById('yaml-header-portfolio');
	const footerCopyrightDiv = document.getElementById('yaml-footer-copyright');
	const employmentDiv = document.getElementById('yaml-employment');
	const skillsDiv = document.getElementById('yaml-skills');
	const educationDiv = document.getElementById('yaml-education');
	const projectsDiv = document.getElementById('yaml-projects');
	const volunteerDiv = document.getElementById('yaml-volunteer');
	
	
	// label: HeaderProfileInjector
	const profileName = document.createElement('h1');
	profileName.id = `headerFullName`;
	profileName.innerHTML = `${parsedData.general.name}`;
	headerProfileDiv.appendChild(profileName);
	parsedData.general.profile.forEach((paragraph, index) => {
		const profileDescription = document.createElement('p');
		profileDescription.id = `headerParagraph-${index + 1}`;
		profileDescription.innerHTML = `${paragraph}`;
		headerProfileDiv.appendChild(profileDescription);
	});
	
	// label: FooterCopyrightInjector
	const footerCopyright = document.createElement('span');
	footerCopyright.innerHTML = `Copyright @ ${parsedData.general.copyrightStart}-${parsedData.general.copyrightEnd} Ethan Goerdel. All Rights Reserved | `;
	footerCopyrightDiv.appendChild(footerCopyright);
	
	// label: URLsInjector
	parsedData.general.links.forEach((Link, index) => {
		const newLink = document.createElement('a');
		newLink.id = `${Link.id}`;
		newLink.href = `${Link.url}`;
		newLink.innerHTML = `${Link.name}`;
		document.getElementById(`${Link.elementid}`).appendChild(newLink);
	});
	
	// label: EmploymentInjector
	parsedData.employment.forEach(job => {
		const jobContainer = document.createElement("div");
		jobContainer.id =`jobContainer-${job.id}`;
		jobContainer.classList.add("row");
		jobContainer.classList.add("time-container");

		const dateContainer = document.createElement("div");
		dateContainer.id =`dateContainer-${job.id}`;
		dateContainer.classList.add("four");
		dateContainer.classList.add("columns");
		dateContainer.classList.add("timeline");
		dateContainer.classList.add("time-cell");

		const dateRange = document.createElement("h4");
		dateRange.id =`jobDateRange-${job.id}`;
		dateRange.innerHTML = `${job.startDate} - ${job.endDate}`;

		const jobDetailsContainer = document.createElement("div");
		jobDetailsContainer.id =`jobDetailsContainer-${job.id}`;
		jobDetailsContainer.classList.add("seven");
		jobDetailsContainer.classList.add("columns");
		jobDetailsContainer.classList.add("offset-by-one");
		jobDetailsContainer.classList.add("time-cell");

		const jobName = document.createElement("h2");
		jobName.id =`jobName-${job.id}`;
		const jobNameLink = document.createElement("a");
		jobNameLink.id =`jobNameLink-${job.id}`;
		if (`${job.url}` != 0) {
			jobNameLink.href = `${job.url}`;
			jobNameLink.target = '_blank';
		}
		jobNameLink.innerHTML = job.name;

		const jobPosition = document.createElement("h3");
		jobPosition.id =`jobPosition-${job.id}`;
		jobPosition.innerHTML = job.position;

		const jobLocation = document.createElement("h5");
		jobLocation.id =`jobLocation-${job.id}`;
		jobLocation.innerHTML = job.location;

		const jobDescription = document.createElement("ul");
		jobDescription.id =`jobDescription-${job.id}`;
		job.jobDescription.forEach((description, index) => {
			const line = document.createElement("li");
			line.innerHTML = description;
			jobDescription.appendChild(line);
		});

		dateContainer.appendChild(dateRange);
		jobName.appendChild(jobNameLink);
		jobDetailsContainer.appendChild(jobName);
		jobDetailsContainer.appendChild(jobPosition);
		jobDetailsContainer.appendChild(jobLocation);
		jobDetailsContainer.appendChild(jobDescription);

		jobContainer.appendChild(dateContainer);
		jobContainer.appendChild(jobDetailsContainer);

		employmentDiv.insertBefore(jobContainer, document.getElementById('row-skills'));
	});
	
	// label: SkillsInjector
	parsedData.skills.forEach((skill, index) => {
		if (index > 0) {
			skillsDiv.appendChild(document.createElement('br'));
		}
		// skill name
		const skillName = document.createElement('h3');
		skillName.id = `skillName-${skill.id}`;
		skillName.innerHTML = `${skill.name}`;
		skillsDiv.appendChild(skillName);
		// skill list
		let skillList = {};
		if (`${skill.type}` == 'li') {
			skillList = document.createElement('ul');
		} else {
			skillList = document.createElement('div');
		}
		skillList.id = `skillList-${skill.id}`;
		skill.data.forEach(item => {
			const skillData = document.createElement(`${skill.type}`);
			skillData.innerHTML = `${item}`;
			skillList.appendChild(skillData);
		});
		skillsDiv.appendChild(skillList);
	});
	// label: EducationInjector
	parsedData.education.forEach((institution, index) => {
		if (index > 0) {
			skillsDiv.appendChild(document.createElement('br'));
		}
		// institution name
		const institutionName = document.createElement('h2');
		institutionName.id = `institutionName-${institution.id}`;
		institutionName.innerHTML = `${institution.name}`;
		educationDiv.appendChild(institutionName);
		// institution major
		const institutionMajor = document.createElement('h3');
		institutionMajor.id = `institutionMajor-${institution.id}`;
		institutionMajor.innerHTML = `${institution.major}`;
		educationDiv.appendChild(institutionMajor);
		// institution location
		const institutionLocation = document.createElement('h5');
		institutionLocation.id = `institutionLocation-${institution.id}`;
		institutionLocation.innerHTML = `${institution.location}`;
		educationDiv.appendChild(institutionLocation);
		// institution dateRange
		const institutionDateRange = document.createElement('h4');
		institutionDateRange.id = `institutionDateRange-${institution.id}`;
		institutionDateRange.innerHTML = `${institution.startDate} - ${institution.endDate}`;
		educationDiv.appendChild(institutionDateRange);
	});
	// label: ProjectsInjector
	parsedData.projects.forEach((project, index) => {
		// project name
		const projectName = document.createElement('h3');
		projectName.id = `projectName-${project.id}`;
		projectName.innerHTML = `${project.name}`;
		projectsDiv.appendChild(projectName);
		// project description
		const projectDesc = document.createElement('p');
		projectDesc.id = `projectDesc-${project.id}`;
		projectDesc.innerHTML = `${project.description}`;
		projectsDiv.appendChild(projectDesc);
	});
	// label: VolunteerInjector
	parsedData.volunteer.forEach((organization, index) => {
		// volunteer name
		const volunteerName = document.createElement('h2');
		volunteerName.id = `volunteerName-${organization.id}`;
		volunteerName.classList.add('title');
		volunteerName.innerHTML = `${organization.name}`;
		volunteerDiv.appendChild(volunteerName);
		// volunteer subtitle
		const volunteerSubtitle = document.createElement('h2');
		volunteerSubtitle.id = `volunteerSubtitle-${organization.id}`;
		volunteerSubtitle.classList.add('sub-title');
		volunteerSubtitle.innerHTML = `${organization.subtitle}`;
		volunteerDiv.appendChild(volunteerSubtitle);
		// volunteer dateRange
		const volunteerDateRange = document.createElement('h3');
		volunteerDateRange.id = `volunteerDateRange-${organization.id}`;
		volunteerDateRange.innerHTML = `${organization.startDate} - ${organization.endDate}`;
		volunteerDiv.appendChild(volunteerDateRange);
		// volunteer description
		const volunteerDescription = document.createElement('p');
		volunteerDescription.id = `volunteerDescription-${organization.id}`;
		volunteerDescription.innerHTML = `${organization.description}`;
		volunteerDiv.appendChild(volunteerDescription);
	});
})
.catch(error => {
	console.error(error);
});