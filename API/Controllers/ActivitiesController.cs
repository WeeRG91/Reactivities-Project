using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivitiyList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivityDetail(string id)
        {
            return HandleResult(await Mediator.Send(new GetActivityDetail.Query { Id = id }));
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(CreateActivityDTO activityDto)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity(EditActivityDto activity)
        {
            return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }
    }
}
